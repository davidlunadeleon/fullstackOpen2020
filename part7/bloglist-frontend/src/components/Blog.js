import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Togglable from './Togglable';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, username, showNotification }) => {
	const dispatch = useDispatch();

	const updateLikes = () => {
		dispatch(likeBlog(blog.id));
	};

	const handleDelete = async (blogId) => {
		if (blog.user.username === username) {
			const check = window.confirm(
				`Do you want to delete ${blog.title} by ${blog.author}?`
			);
			if (check) {
				try {
					dispatch(deleteBlog(blogId));
					showNotification('info', 'Blog deleted');
				} catch (exception) {
					showNotification('error', 'Blog could not be deleted');
				}
			}
		}
	};

	const showRemoveButton = () => {
		if (blog.user.username === username) {
			return (
				<div>
					<button
						onClick={() => handleDelete(blog.id)}
						className="remove-blog-button"
					>
						Remove
					</button>
				</div>
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
	handleLikes: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	blog: PropTypes.object.isRequired
};

export default Blog;
