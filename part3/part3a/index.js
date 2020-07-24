const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const Note = require('./models/note');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body);
	} else {
		return null;
	}
});

app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			tokens.body(req, res)
		].join(' ');
	})
);

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
];

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.route('/').get((req, res) => {
	res.send('<h1>Hello, world!</h1>');
});

app.route('/api/notes')
	.get((req, res) => {
		Note.find({}).then((notes) => {
			res.json(notes);
		});
	})
	.post((req, res) => {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({ error: 'content missing' });
		}
		const note = new Note({
			content: body.content,
			important: body.important || false,
			date: new Date()
		});
		note.save().then((savedNote) => {
			res.json(savedNote);
		});
	});

app.route('/api/notes/:id')
	.get((req, res, next) => {
		Note.findById(req.params.id)
			.then((note) => {
				if (note) {
					res.json(note);
				} else {
					res.status(404).end();
				}
			})
			.catch((error) => {
				next(error);
			});
	})
	.delete((req, res, next) => {
		Note.findByIdAndRemove(req.params.id)
			.then((result) => {
				res.status(204).end();
			})
			.catch((error) => next(error));
	})
	.put((req, res, next) => {
		const body = req.body;
		const note = {
			content: body.content,
			important: body.important
		};
		Note.findByIdAndUpdate(req.params.id, note, { new: true })
			.then((updatedNote) => {
				res.json(updatedNote);
			})
			.catch((error) => next(error));
	});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.log(error);
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformated id' });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
