import React, { useState } from 'react';

const Blog = ({ blog, handleLikes }) => {
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

	return (
		<div>
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
		</div>
	);
};

export default Blog;
