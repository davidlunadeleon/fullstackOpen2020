import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogs from './components/AddBlogs';
import Togglable from './components/Togglable';

import './App.css';

import { initialBlogs } from './reducers/blogsReducer';
import { loginPreviousSession, logoutUser } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const blogFormRef = useRef();

	useEffect(() => {
		dispatch(initialBlogs());
		dispatch(loginPreviousSession());
	}, [dispatch]);

	const handleCreateBlog = () => {
		try {
			blogFormRef.current.toggleVisibility();
			setNotification('info', 'Blog created.');
		} catch (exception) {
			setNotification('error', 'Cannot create blog. Try again.');
		}
	};

	const logout = () => {
		dispatch(logoutUser());
		setNotification('info', 'Logged out.');
	};

	return (
		<div>
			<h1>Blog List App</h1>
			<Notification />
			{user === null ? (
				<Login />
			) : (
				<div>
					<button onClick={logout}>Log out</button>
					<Togglable
						showButtonLabel="Create new blog"
						hideButtonLabel="cancel"
						ref={blogFormRef}
					>
						<AddBlogs handleCreateBlog={handleCreateBlog} />
					</Togglable>
					<Blogs />
				</div>
			)}
		</div>
	);
};

export default App;
