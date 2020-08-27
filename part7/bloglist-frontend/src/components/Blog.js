import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

import Comments from './Comments';

const Blog = ({ blog }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const updateLikes = () => {
		try {
			dispatch(likeBlog(blog.id));
			dispatch(setNotification('success', 'Blog liked'));
		} catch (exception) {
			dispatch(setNotification('danger', 'Blog could not be updated'));
		}
	};

	const handleDelete = async () => {
		if (
			typeof user.username !== 'undefined' &&
			blog.user.username === user.username
		) {
			const check = window.confirm(
				`Do you want to delete ${blog.title} by ${blog.author}?`
			);
			if (check) {
				try {
					dispatch(deleteBlog(blog.id));
					dispatch(setNotification('success', 'Blog deleted'));
				} catch (exception) {
					dispatch(
						setNotification('danger', 'Blog could not be deleted')
					);
				}
			}
		}
	};

	const showRemoveButton = () => {
		if (
			typeof user.username !== 'undefined' &&
			blog.user.username === user.username
		) {
			return (
				<button onClick={handleDelete} className="remove-blog-button">
					Remove
				</button>
			);
		}
		return <div></div>;
	};

	const checkBlog = () => {
		if (blog) {
			return (
				<div className="blog-element">
					<h3>
						{blog.title} by {blog.author}
					</h3>
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
					<Comments blog={blog} />
				</div>
			);
		} else {
			return <div></div>;
		}
	};

	return checkBlog();
};

export default Blog;
