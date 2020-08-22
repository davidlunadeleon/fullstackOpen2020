import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from '../components/Blogs';
import AddBlogs from '../components/AddBlogs';
import Togglable from '../components/Togglable';

import { setNotification } from '../reducers/notificationReducer';

const Home = () => {
	const blogs = useSelector((state) => state.blogs);
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
			<h2>Blogs</h2>
			<Blogs blogs={blogs} />
		</div>
	);
};

export default Home;
