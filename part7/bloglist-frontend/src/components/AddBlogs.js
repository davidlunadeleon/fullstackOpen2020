import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';

const AddBlogs = ({ handleCreateBlog }) => {
	const dispatch = useDispatch();

	const createBlog = (event) => {
		event.preventDefault();

		const values = event.target;

		dispatch(
			addBlog({
				title: values.inputTitle.value,
				url: values.inputUrl.value,
				author: values.inputAuthor.value
			})
		);
		handleCreateBlog();
	};

	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={createBlog}>
				<div className="form-input">
					Title:{' '}
					<input type="text" id="inputTitle" name="inputTitle" />
				</div>
				<div className="form-input">
					Author:{' '}
					<input type="text" id="inputAuthor" name="inputAuthor" />
				</div>
				<div className="form-input">
					Url: <input type="text" id="inputUrl" name="inputUrl" />
				</div>
				<button type="submit" id="createBlogButton">
					Create
				</button>
			</form>
		</div>
	);
};

AddBlogs.propTypes = {
	handleCreateBlog: PropTypes.func.isRequired
};

export default AddBlogs;
