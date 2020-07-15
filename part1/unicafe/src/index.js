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

const DisplayStatistic = ({ text, num }) => {
	return (
		<div>
			{text} {num}
		</div>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const getPercentage = () => {
		let ans = good / (good + neutral + bad);
		if (isNaN(ans)) {
			return '0 %';
		} else {
			return `${ans * 100} %`;
		}
	};

	const getAverage = () => {
		let ans = (good - bad) / (good + neutral + bad);
		if (isNaN(ans)) {
			return 0;
		} else {
			return ans;
		}
	};

	return (
		<div>
			<DisplayTitle text="give feedback" />
			<Button text="good" handleClick={setGood} value={good} />
			<Button text="neutral" handleClick={setNeutral} value={neutral} />
			<Button text="bad" handleClick={setBad} value={bad} />
			<DisplayTitle text="statistic" />
			<DisplayStatistic text="good" num={good} />
			<DisplayStatistic text="neutral" num={neutral} />
			<DisplayStatistic text="bad" num={bad} />
			<DisplayStatistic text="all" num={good + neutral + bad} />
			<DisplayStatistic text="average" num={getAverage()} />
			<DisplayStatistic text="positive" num={getPercentage()} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
