import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom';

import Login from './components/Login';
import Notification from './components/Notification';
import Home from './components/Home';
import Users from './components/Users';
import UserView from './components/UserView';
import Blog from './components/Blog';

import './App.css';

import { initialBlogs } from './reducers/blogsReducer';
import { loginPreviousSession, logoutUser } from './reducers/userReducer';
import { initUserList } from './reducers/userListReducer';

const App = () => {
	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) => state.blogs);
	const userList = useSelector((state) => state.userList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initialBlogs());
		dispatch(loginPreviousSession());
		dispatch(initUserList());
	}, [dispatch]);

	const logout = () => {
		dispatch(logoutUser());
	};

	const renderBlogMain = () => {
		return (
			<div>
				<h1>Blog List App</h1>
				<Notification />
			</div>
		);
	};

	const matchUser = useRouteMatch('/user/:id');
	const userForView = matchUser
		? userList.find((u) => u.id === matchUser.params.id)
		: null;

	const matchBlog = useRouteMatch('/blogs/:id');
	const blogForView = matchBlog
		? blogs.find((b) => b.id === matchBlog.params.id)
		: null;

	return (
		<div>
			<nav>
				<Link className="navLink" to="/">
					home
				</Link>
				<Link className="navLink" to="/users">
					users
				</Link>
				{user ? (
					<div id="loggedIn">
						{user ? user.username : ''} logged in
						<button onClick={logout}>Log out</button>
					</div>
				) : (
					<Link className="navLink" to="/login">
						login
					</Link>
				)}
			</nav>
			<Switch>
				<Route path="/blogs/:id">
					{renderBlogMain()}
					{user ? (
						<Blog blog={blogForView} />
					) : (
						<Redirect to="/login" />
					)}
				</Route>
				<Route path="/user/:id">
					{renderBlogMain()}
					{user ? (
						<UserView user={userForView} />
					) : (
						<Redirect to="/login" />
					)}
				</Route>
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
		</div>
	);
};

export default App;
