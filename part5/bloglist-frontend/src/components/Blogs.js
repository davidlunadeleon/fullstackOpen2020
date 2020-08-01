import React from 'react';

import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
	const blogContent = (blog) => {
		return (
			<div>
				<p>
					Url: <a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					Likes: {blog.likes}
					<button className="like-button">Like</button>
				</p>
				<p>User: {blog.user.name}</p>
				<p>Username: {blog.user.username}</p>
			</div>
		);
	};

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					{blog.title} by {blog.author}
					<Togglable showButtonLabel="View" hideButtonLabel="Hide">
						{blogContent(blog)}
					</Togglable>
				</div>
			))}
		</div>
	);
};

export default Blogs;
