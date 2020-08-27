import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
			<nav className="navbar navbar-expand-lg bg-light">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/">
							home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/users">
							users
						</Link>
					</li>
					{user ? (
						<div></div>
					) : (
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								login
							</Link>
						</li>
					)}
				</ul>
				{user ? (
					[
						<span className="navbar-text">
							{user ? user.username : ''} logged in
						</span>,
						<form className="form-inline">
							<Button onClick={logout} variant="outline-primary">
								Log out
							</Button>
						</form>
					]
				) : (
					<div></div>
				)}
			</nav>
			<div className="app-body">
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
		</div>
	);
};

export default App;
