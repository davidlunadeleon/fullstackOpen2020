const express = require('express');
const morgan = require('morgan');

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

let persons = [
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
	{ name: 'Ada Lovelace', number: '30-123456', id: 2 },
	{ name: 'Dan Abramov', number: '12-345678', id: 3 },
	{ name: 'Pepe Leal', number: '12-901234', id: 4 }
];

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
		res.json(persons);
	})
	.post((req, res) => {
		if (!req.body.name || !req.body.number) {
			return res.status(400).json({
				error: 'Fields missing!'
			});
		}
		if (persons.find((p) => p.name === req.body.name)) {
			return res.status(400).json({
				error: 'Name cannot be repeated.'
			});
		}
		const id = makeId();
		const newPerson = {
			name: req.body.name,
			number: req.body.number,
			id: id
		};
		persons = persons.concat(newPerson);
		res.json(newPerson);
	});

app.route('/api/persons/:id')
	.get((req, res) => {
		const personData = persons.find((p) => p.id === Number(req.params.id));
		if (personData) {
			res.json(personData);
		} else {
			res.status(404).end();
		}
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
