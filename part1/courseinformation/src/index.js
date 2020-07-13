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
		total += element.exercises;
	});
	return (
		<div>
			<p>Number of exercises {total}</p>
		</div>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total exercises={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
