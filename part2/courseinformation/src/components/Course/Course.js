import React from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import SumOfExercises from '../SumOfExercises/SumOfExercises';

const Course = ({ course }) => {
	return (
		<div>
			<Header header={course.name} />
			<Content parts={course.parts} />
			<SumOfExercises parts={course.parts} />
		</div>
	);
};

export default Course;
