import React from 'react';

import Togglable from './Togglable';
import Blog from './Blog';

const Blogs = ({ blogs, handleLikes, username, handleDelete }) => {
	blogs.sort((b1, b2) => b2.likes - b1.likes);

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					{blog.title} by {blog.author}
					<Togglable showButtonLabel="View" hideButtonLabel="Hide">
						<Blog
							blog={blog}
							handleLikes={handleLikes}
							username={username}
							handleDelete={handleDelete}
						/>
					</Togglable>
				</div>
			))}
		</div>
	);
};

export default Blogs;
