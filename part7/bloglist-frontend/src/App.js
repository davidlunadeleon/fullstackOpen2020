import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogs from './components/AddBlogs';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

import { initialBlogs } from './reducers/blogsReducer';

const App = () => {
	const dispatch = useDispatch();

	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	const blogFormRef = useRef();

	useEffect(() => {
		dispatch(initialBlogs());
	}, [dispatch]);

	useEffect(() => {
		const loggedBlogUser = window.localStorage.getItem('loggedBlogUser');
		if (loggedBlogUser) {
			const savedUser = JSON.parse(loggedBlogUser);
			setUser(savedUser);
		}
	}, []);

	useEffect(() => {
		if (user) {
			blogService.setToken(user.token);
		}
	}, [user]);

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({
				username,
				password
			});
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
			setUser(user);
			showNotification('info', 'Log in successful');
		} catch (exception) {
			showNotification('error', 'Invalid credentials');
		}
	};

	const handleCreateBlog = () => {
		try {
			blogFormRef.current.toggleVisibility();
			showNotification('info', 'Blog created.');
		} catch (exception) {
			showNotification('error', 'Cannot create blog. Try again.');
		}
	};

	const showNotification = (type, text) => {
		const toShow = {
			text: text,
			type: type
		};
		setNotification(toShow);
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	const logout = () => {
		window.localStorage.removeItem('loggedBlogUser');
		showNotification('info', 'Logged out.');
		setUser(null);
	};

	return (
		<div>
			<h1>Blog List App</h1>
			<Notification notification={notification} />
			{user === null ? (
				<Login handleLogin={handleLogin} />
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
					<Blogs
						username={user.username}
						showNotification={showNotification}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
