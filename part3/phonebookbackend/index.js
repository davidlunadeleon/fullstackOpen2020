const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
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
	res.send('<h1>Hello world!</h1>');
});

app.route('/info').get((req, res, next) => {
	const date = new Date();
	Person.find({})
		.then((persons) => {
			res.send(
				`<p>Phonebook has info of ${persons.length} people.</p><p>${date}</p>`
			);
		})
		.catch((error) => next(error));
});

app.route('/api/persons')
	.get((req, res, next) => {
		Person.find({})
			.then((people) => {
				res.json(people);
			})
			.catch((error) => next(error));
	})
	.post((req, res, next) => {
		const newPerson = new Person({
			name: req.body.name,
			number: req.body.number
		});
		newPerson
			.save()
			.then((savedPerson) => {
				res.json(savedPerson);
			})
			.catch((error) => next(error));
	});

app.route('/api/persons/:id')
	.get((req, res, next) => {
		Person.findById(req.params.id)
			.then((person) => {
				if (person) {
					res.json(person);
				} else {
					res.status(404).end();
				}
			})
			.catch((error) => next(error));
	})
	.delete((req, res, next) => {
		Person.findByIdAndRemove(req.params.id)
			.then(() => {
				res.status(204).end();
			})
			.catch((error) => next(error));
	})
	.put((req, res, next) => {
		const body = req.body;
		const person = {
			name: body.name,
			number: body.number
		};
		Person.findByIdAndUpdate(req.params.id, person, {
			runValidators: true,
			context: 'query',
			new: true
		})
			.then((updatedPerson) => {
				res.json(updatedPerson);
			})
			.catch((error) => next(error));
	});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.log(error.message);
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformated id.' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
