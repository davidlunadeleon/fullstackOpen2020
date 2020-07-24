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

app.route('/').get((req, res) => {
	res.send('<h1>Hello, world!</h1>');
});

app.route('/api/notes')
	.get((req, res) => {
		Note.find({}).then((notes) => {
			res.json(notes);
		});
	})
	.post((req, res, next) => {
		const body = req.body;
		const note = new Note({
			content: body.content,
			important: body.important || false,
			date: new Date()
		});
		note.save()
			.then((savedNote) => {
				res.json(savedNote);
			})
			.catch((error) => next(error));
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
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
