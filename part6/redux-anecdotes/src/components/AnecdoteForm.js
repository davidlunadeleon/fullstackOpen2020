import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import {
	clearNotification,
	showNotification
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(content));
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
