import React, { useState, useEffect } from 'react';

import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogs from './components/AddBlogs';

import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

const App = () => {
	const [blogs, setBlogss] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [author, setAuthor] = useState('');
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
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

	useEffect(() => {
		if (user) {
			blogService.setToken(user.token);
		}
	}, [user]);

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

	const handleCreateBlog = async (event) => {
		event.preventDefault();
		try {
			const blogToPost = {
				author: author,
				title: title,
				url: url
			};
			const newBlog = await blogService.postBlog(blogToPost);
			setBlogss(blogs.concat(newBlog));
			setTitle('');
			setAuthor('');
			setUrl('');
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
					<AddBlogs
						url={url}
						title={title}
						author={author}
						setTitle={setTitle}
						setAuthor={setAuthor}
						setUrl={setUrl}
						handleCreateBlog={handleCreateBlog}
					/>
					<Blogs blogs={blogs} />
				</div>
			)}
		</div>
	);
};

export default App;
