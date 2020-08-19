import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from '../components/Blogs';
import AddBlogs from '../components/AddBlogs';
import Togglable from '../components/Togglable';

import { setNotification } from '../reducers/notificationReducer';

const Home = () => {
	const dispatch = useDispatch();

	const blogFormRef = useRef();

	const handleCreateBlog = () => {
		try {
			blogFormRef.current.toggleVisibility();
			dispatch(setNotification('info', 'Blog created.'));
		} catch (exception) {
			dispatch(
				setNotification('error', 'Cannot create blog. Try again.')
			);
		}
	};

	return (
		<div>
			<Togglable
				showButtonLabel="Create new blog"
				hideButtonLabel="cancel"
				ref={blogFormRef}
			>
				<AddBlogs handleCreateBlog={handleCreateBlog} />
			</Togglable>
			<Blogs />
		</div>
	);
};

export default Home;
