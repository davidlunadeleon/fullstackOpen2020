import React, { useState, useEffect } from 'react';

import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

const App = () => {
	const [blogs, setBlogss] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		async function fetchBlogs() {
			const blogs = await blogService.getAll();
			setBlogss(blogs);
		}
		fetchBlogs();
	}, []);

	useEffect(() => {
		const loggedBlogUser = window.localStorage.getItem('loggedBlogUser');
		if (loggedBlogUser) {
			const savedUser = JSON.parse(loggedBlogUser);
			setUser(savedUser);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password
			});
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
			setUser(user);
			setUsername('');
			setPassword('');
			showNotification('info', 'Log in successful');
		} catch (exception) {
			showNotification('error', 'Invalid credentials');
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
		setUser(null);
	};

	return (
		<div>
			<h1>Blog List App</h1>
			<Notification notification={notification} />
			{user === null ? (
				<Login
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>
			) : (
				<div>
					<button onClick={logout}>Log out</button>
					<Blogs blogs={blogs} />
				</div>
			)}
		</div>
	);
};

export default App;
