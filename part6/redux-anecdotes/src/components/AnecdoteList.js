import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import {
	clearNotification,
	showNotification
} from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVote }) => {
	return (
		<div className="anecdoteDiv">
			<div className="anecodeContent">{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleVote} className="voteButton">
					vote
				</button>
			</div>
		</div>
	);
};

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filters);

	const handleVote = (anecdote) => {
		dispatch(addVote(anecdote.id));
		dispatch(showNotification(anecdote.content));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};

	return (
		<div>
			{anecdotes
				.filter((a) =>
					a.content.toUpperCase().includes(filter.toUpperCase())
				)
				.map((anecdote) => (
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleVote={() => handleVote(anecdote)}
					/>
				))}
		</div>
	);
};

export default AnecdoteList;
