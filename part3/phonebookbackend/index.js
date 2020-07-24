const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
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

const makeId = () => {
	let id = 0;
	do {
		id = Math.floor(Math.random() * 1000);
	} while (persons.find((p) => p.id === id));
	return id;
};

app.route('/').get((req, res) => {
	res.send('<h1>Hello world!</h1>');
});

app.route('/info').get((req, res) => {
	const date = new Date();
	res.send(
		`<p>Phonebook has info of ${persons.length} people.</p><p>${date}</p>`
	);
});

app.route('/api/persons')
	.get((req, res) => {
		Person.find({}).then((people) => {
			res.json(people);
		});
	})
	.post((req, res) => {
		if (!req.body.name || !req.body.number) {
			return res.status(400).json({
				error: 'Fields missing!'
			});
		}
		const newPerson = new Person({
			name: req.body.name,
			number: req.body.number
		});
		newPerson.save().then((savedPerson) => {
			res.json(savedPerson);
		});
	});

app.route('/api/persons/:id')
	.get((req, res) => {
		Person.findById(req.params.id).then((person) => {
			res.json(person);
		});
	})
	.delete((req, res) => {
		persons = persons.filter((p) => p.id != Number(req.params.id));
		res.status(204).end();
	});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
