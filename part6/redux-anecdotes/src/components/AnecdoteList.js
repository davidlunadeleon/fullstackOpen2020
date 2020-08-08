import React from 'react';
import { connect } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

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

const AnecdoteList = (props) => {
	const handleVote = (anecdote) => {
		props.addVote(anecdote.id);
		props.setNotification(`You voted for: ${anecdote.content}`, 5);
	};

	return (
		<div>
			{props.anecdotes
				.filter((a) =>
					a.content.toUpperCase().includes(props.filter.toUpperCase())
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filters
	};
};

const mapDispatchToProps = {
	setNotification,
	addVote
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
