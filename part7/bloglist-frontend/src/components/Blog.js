import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Togglable from './Togglable';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, username }) => {
	const dispatch = useDispatch();

	const updateLikes = () => {
		try {
			dispatch(likeBlog(blog.id));
			dispatch(setNotification('info', 'Blog liked'));
		} catch (exception) {
			dispatch(setNotification('error', 'Blog could not be updated'));
		}
	};

	const handleDelete = async () => {
		if (blog.user.username === username) {
			const check = window.confirm(
				`Do you want to delete ${blog.title} by ${blog.author}?`
			);
			if (check) {
				try {
					dispatch(deleteBlog(blog.id));
					dispatch(setNotification('info', 'Blog deleted'));
				} catch (exception) {
					dispatch(
						setNotification('error', 'Blog could not be deleted')
					);
				}
			}
		}
	};

	const showRemoveButton = () => {
		if (blog.user.username === username) {
			return (
				<button onClick={handleDelete} className="remove-blog-button">
					Remove
				</button>
			);
		}
		return <div></div>;
	};

	return (
		<div className="blog-element">
			{blog.title} by {blog.author}
			<Togglable showButtonLabel="View" hideButtonLabel="Hide">
				<p>
					Url: <a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					Likes: {blog.likes}
					<button className="like-button" onClick={updateLikes}>
						Like
					</button>
				</p>
				<p>User: {blog.user.name}</p>
				<p>Username: {blog.user.username}</p>
				{showRemoveButton()}
			</Togglable>
		</div>
	);
};

Blog.propTypes = {
	username: PropTypes.string.isRequired,
	blog: PropTypes.object.isRequired
};

export default Blog;
