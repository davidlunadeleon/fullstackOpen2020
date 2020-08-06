import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';

import './App.css';

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(addVote(id));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id} className="anecdoteDiv">
					<div className="anecodeContent">{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => vote(anecdote.id)}
							className="voteButton"
						>
							vote
						</button>
					</div>
				</div>
			))}
			<AnecdoteForm />
		</div>
	);
};

export default App;
