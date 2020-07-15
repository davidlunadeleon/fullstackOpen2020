import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const DisplayTitle = ({ text }) => {
	return <h1>{text}</h1>;
};

const Button = ({ text, handleClick, value }) => {
	const func = () => {
		handleClick(value + 1);
	};
	return <button onClick={func}>{text}</button>;
};

const DisplayStatistic = ({ text, numReviews }) => {
	return (
		<div>
			{text} {numReviews}
		</div>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<DisplayTitle text="give feedback" />
			<Button text="good" handleClick={setGood} value={good} />
			<Button text="neutral" handleClick={setNeutral} value={neutral} />
			<Button text="bad" handleClick={setBad} value={bad} />
			<DisplayTitle text="statistic" />
			<DisplayStatistic text="good" numReviews={good} />
			<DisplayStatistic text="neutral" numReviews={neutral} />
			<DisplayStatistic text="bad" numReviews={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
