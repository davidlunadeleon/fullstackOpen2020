import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const DisplayTitle = ({ text }) => {
	return <h1>{text}</h1>;
};

const DisplayP = (props) => {
	let text = '';
	for (const key in props) {
		text += props[key] + ' ';
	}
	return <p>{text}</p>;
};

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(new Array(6).fill(0));
	const [mostVotes, setMostVotes] = useState(0);

	const anecdoteHandler = () => {
		let temp;
		do {
			temp = Math.floor(Math.random() * 6);
		} while (temp === selected);
		return setSelected(temp);
	};

	const pointsHandler = () => {
		const tempPoints = [...points];
		tempPoints[selected] += 1;
		setPoints(tempPoints);
		if (tempPoints[selected] > tempPoints[mostVotes]) {
			setMostVotes(selected);
		}
	};

	return (
		<div>
			<DisplayTitle text="Anecdote of the day" />
			<DisplayP text={props.anecdotes[selected]} />
			<DisplayP text="Has" numVotes={points[selected]} moreText="votes" />
			<Button text="next anecdote" handleClick={anecdoteHandler} />
			<Button text="vote" handleClick={pointsHandler} />
			<DisplayTitle text="Anecdote with the most votes" />
			<DisplayP text={props.anecdotes[mostVotes]} />
			<DisplayP
				text="Has"
				numVotes={points[mostVotes]}
				moreText="votes"
			/>
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
