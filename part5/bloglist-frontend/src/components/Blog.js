import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

const Blog = ({ blog, handleLikes, username, handleDelete }) => {
	const [likes, setLikes] = useState(blog.likes);
	const [likeOrDislike, setLikeOrDislike] = useState(true);

	const updateLikes = () => {
		const newLikes = likeOrDislike ? likes + 1 : likes - 1;
		updateLikeState(newLikes);
		handleLikes({
			id: blog.id,
			likes: newLikes
		});
	};

	const updateLikeState = (likes) => {
		likeOrDislike ? setLikes(likes) : setLikes(likes);
		setLikeOrDislike(!likeOrDislike);
	};

	const showRemoveButton = () => {
		if (blog.user.username === username) {
			return (
				<div>
					<button onClick={() => handleDelete(blog.id)}>
						Remove
					</button>
				</div>
			);
		}
		return <div></div>;
	};

	return (
		<div>
			{blog.title} by {blog.author}
			<Togglable showButtonLabel="View" hideButtonLabel="Hide">
				<p>
					Url: <a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					Likes: {likes}
					<button className="like-button" onClick={updateLikes}>
						{likeOrDislike ? 'Like' : 'Dislike'}
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
	handleDelete: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	blog: PropTypes.object.isRequired
};

export default Blog;
