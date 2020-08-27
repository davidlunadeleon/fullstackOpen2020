import React from 'react';

import CommentsForm from './CommentsForm';

const Comments = ({ blog }) => {
	const makeList = () => (
		<ul>
			{blog.comments.map((c) => (
				<li key={c}>{c}</li>
			))}
		</ul>
	);

	return (
		<div>
			<h3>Comments:</h3>
			<CommentsForm id={blog.id} />
			{makeList()}
		</div>
	);
};

export default Comments;
