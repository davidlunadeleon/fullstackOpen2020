import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};

const Part = (props) => {
	return (
		<div>
			<p>
				{props.part} {props.exercises}
			</p>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((element) => {
				return (
					<Part
						part={element.name}
						exercises={element.exercises}
						key={element.name + element.exercises.toString()}
					/>
				);
			})}
		</div>
	);
};

const Total = (props) => {
	let total = 0;
	props.exercises.forEach((element) => {
		total += element;
	});
	return (
		<div>
			<p>Number of exercises {total}</p>
		</div>
	);
};

const App = () => {
	const course = 'Half Stack application development';
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10
	};
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7
	};
	const part3 = {
		name: 'State of a component',
		exercises: 14
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={[part1, part2, part3]} />
			<Total
				exercises={[part1.exercises, part2.exercises, part3.exercises]}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
