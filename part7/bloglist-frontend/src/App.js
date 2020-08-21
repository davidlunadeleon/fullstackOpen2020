import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Notification from './components/Notification';
import Home from './components/Home';

import './App.css';

import { initialBlogs } from './reducers/blogsReducer';
import { loginPreviousSession, logoutUser } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import { initUserList } from './reducers/userListReducer';

const App = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initialBlogs());
		dispatch(loginPreviousSession());
		dispatch(initUserList());
	}, [dispatch]);

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
					<Home />
				</div>
			)}
		</div>
	);
};

export default App;
