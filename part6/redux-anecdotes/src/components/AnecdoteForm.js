import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import {
	clearNotification,
	showNotification
} from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotesService';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();

		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		const newAnecdote = await anecdoteService.createAnecdote(content);

		dispatch(createAnecdote(newAnecdote));
		dispatch(showNotification(content));

		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};

	return (
		<div>
			<h2>create new anecdote</h2>
			<form onSubmit={addAnecdote}>
				<input name="anecdote" />
				<br />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
