import React from 'react';

const AddBlogs = (props) => {
	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={props.handleCreateBlog}>
				<div className="form-input">
					Title:{' '}
					<input
						type="text"
						value={props.title}
						onChange={({ target }) => {
							props.setTitle(target.value);
						}}
					/>
				</div>
				<div className="form-input">
					Author:{' '}
					<input
						type="text"
						value={props.author}
						onChange={({ target }) => {
							props.setAuthor(target.value);
						}}
					/>
				</div>
				<div className="form-input">
					Url:{' '}
					<input
						type="text"
						value={props.url}
						onChange={({ target }) => {
							props.setUrl(target.value);
						}}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default AddBlogs;
