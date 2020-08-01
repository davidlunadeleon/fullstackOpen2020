import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlogs = ({ handleCreateBlog }) => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [author, setAuthor] = useState('');

	const createBlog = (event) => {
		event.preventDefault();
		handleCreateBlog({
			title: title,
			url: url,
			author: author
		});
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
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

AddBlogs.propTypes = {
	handleCreateBlog: PropTypes.func.isRequired
};

export default AddBlogs;
