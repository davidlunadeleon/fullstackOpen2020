import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();

		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		dispatch(createAnecdote(content));
		dispatch(setNotification(`You created the anecdote: ${content}`, 5));
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
