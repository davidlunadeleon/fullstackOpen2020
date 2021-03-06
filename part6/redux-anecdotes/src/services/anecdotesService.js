import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const createAnecdote = async (content) => {
	const newAnecdote = {
		content,
		votes: 0
	};
	const res = await axios.post(baseUrl, newAnecdote);
	return res.data;
};

const addVote = async (id) => {
	const getAnecdote = await axios.get(`${baseUrl}/${id}`);
	const anecdote = getAnecdote.data;
	anecdote.votes += 1;
	const res = await axios.put(`${baseUrl}/${id}`, anecdote);
	return res.data;
};

export default { getAll, createAnecdote, addVote };
