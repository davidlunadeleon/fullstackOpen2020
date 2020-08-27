import React from 'react';
import { useDispatch } from 'react-redux';

import { commentBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const CommentsForm = ({ id }) => {
	const dispatch = useDispatch();

	const handleComment = (event) => {
		event.preventDefault();
		const values = event.target;
		dispatch(commentBlog(id, values.newComment.value));
		dispatch(setNotification('success', 'Comment created'));
		values.newComment.value = '';
	};

	return (
		<form onSubmit={handleComment}>
			<div className="formInput">
				new comment: <input id="newComment" type="text" />
				<button type="submit" id="submitComment">
					create comment
				</button>
			</div>
		</form>
	);
};

export default CommentsForm;
