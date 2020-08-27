import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

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
			<Form onSubmit={createBlog}>
				<Form.Group controlId="formTitle">
					<Form.Label>Title: </Form.Label>
					<Form.Control type="text" name="inputTitle" />
				</Form.Group>
				<Form.Group controlId="formAuthor">
					<Form.Label>Author: </Form.Label>
					<Form.Control type="text" name="inputAuthor" />
				</Form.Group>
				<Form.Group controlId="formUrl">
					<Form.Label>Url: </Form.Label>
					<Form.Control type="text" name="inputUrl" />
				</Form.Group>
				<Button variant="primary" type="submit" id="createBlogButton">
					Create
				</Button>
			</Form>
		</div>
	);
};

AddBlogs.propTypes = {
	handleCreateBlog: PropTypes.func.isRequired
};

export default AddBlogs;
