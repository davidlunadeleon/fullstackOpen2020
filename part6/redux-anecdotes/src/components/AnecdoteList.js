import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';

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
	const anecdotes = useSelector((state) => state);

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVote={() => dispatch(addVote(anecdote.id))}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
