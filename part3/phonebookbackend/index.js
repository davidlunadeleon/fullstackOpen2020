const express = require('express');
const app = express();

let persons = [
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
	{ name: 'Ada Lovelace', number: '30-123456', id: 2 },
	{ name: 'Dan Abramov', number: '12-345678', id: 3 },
	{ name: 'Pepe Leal', number: '12-901234', id: 4 }
];

app.route('/').get((req, res) => {
	res.send('<h1>Hello world!</h1>');
});

app.route('/info').get((req, res) => {
	const date = new Date();
	res.send(
		`<p>Phonebook has info of ${persons.length} people.</p><p>${date}</p>`
	);
});

app.route('/api/persons').get((req, res) => {
	res.json(persons);
});

app.route('/api/persons/:id').get((req, res) => {
	console.log('wenas');
	const personData = persons.find((p) => p.id === Number(req.params.id));
	if (personData) {
		res.json(personData);
	} else {
		res.status(404).end();
	}
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
