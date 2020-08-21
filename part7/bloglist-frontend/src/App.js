import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';

import Login from './components/Login';
import Notification from './components/Notification';
import Home from './components/Home';
import Users from './components/Users';

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

	const renderBlogMain = () => {
		return (
			<div>
				<h1>Blog List App</h1>
				<h3>{user ? user.username : ''} logged in</h3>
				<Notification />
				<button onClick={logout}>Log out</button>
			</div>
		);
	};

	return (
		<Router>
			<nav>
				<Link className="navLink" to="/">
					home
				</Link>
				<Link className="navLink" to="/users">
					users
				</Link>
				{user ? (
					<div></div>
				) : (
					<Link className="navLink" to="/login">
						login
					</Link>
				)}
			</nav>
			<Switch>
				<Route path="/users">
					{renderBlogMain()}
					{user ? <Users /> : <Redirect to="/login" />}
				</Route>
				<Route path="/login">
					{user ? <Redirect to="/" /> : <Login />}
				</Route>
				<Route path="/">
					{renderBlogMain()}
					{user ? <Home /> : <Redirect to="/login" />}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
