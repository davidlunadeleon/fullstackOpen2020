import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';

const AddBlogs = ({ handleCreateBlog }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [author, setAuthor] = useState('');

	const createBlog = (event) => {
		event.preventDefault();

		dispatch(
			addBlog({
				title: title,
				url: url,
				author: author
			})
		);
		handleCreateBlog();

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={createBlog}>
				<div className="form-input">
					Title:{' '}
					<input
						type="text"
						value={title}
						onChange={({ target }) => {
							setTitle(target.value);
						}}
						id="inputTitle"
					/>
				</div>
				<div className="form-input">
					Author:{' '}
					<input
						type="text"
						value={author}
						onChange={({ target }) => {
							setAuthor(target.value);
						}}
						id="inputAuthor"
					/>
				</div>
				<div className="form-input">
					Url:{' '}
					<input
						type="text"
						value={url}
						onChange={({ target }) => {
							setUrl(target.value);
						}}
						id="inputUrl"
					/>
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
