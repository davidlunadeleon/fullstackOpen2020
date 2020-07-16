import React from 'react';

const SumOfExercises = ({ parts }) => {
	const total = parts.reduce(
		(sumOfParts, part) => (sumOfParts += part.exercises),
		0
	);
	return <strong>Total of {total} exercises</strong>;
};

export default SumOfExercises;
