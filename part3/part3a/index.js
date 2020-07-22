const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

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
		res.json(notes);
	})
	.post((req, res) => {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({ error: 'content missing' });
		}
		const note = {
			content: body.content,
			important: body.important || false,
			date: new Date(),
			id: generateId()
		};
		notes = notes.concat(note);
		res.json(note);
	});

app.route('/api/notes/:id')
	.get((req, res) => {
		const id = Number(req.params.id);
		const note = notes.find((note) => note.id === id);
		if (note) {
			res.json(note);
		} else {
			res.status(404).end();
		}
	})
	.delete((req, res) => {
		const id = Number(req.params.id);
		notes = notes.filter((note) => note.id !== id);
		res.status(204).end();
	});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
