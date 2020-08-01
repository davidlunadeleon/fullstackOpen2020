import React from 'react';

import Togglable from './Togglable';
import Blog from './Blog';

const Blogs = ({ blogs, handleLikes }) => {
	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					{blog.title} by {blog.author}
					<Togglable showButtonLabel="View" hideButtonLabel="Hide">
						<Blog blog={blog} handleLikes={handleLikes} />
					</Togglable>
				</div>
			))}
		</div>
	);
};

export default Blogs;
