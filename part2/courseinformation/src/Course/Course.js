import React from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';

const Course = ({ course }) => {
	return (
		<div>
			<Header header={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;
