import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
	return (
		<div>
			{blogs.map((blog) => (
				<Link
					key={blog.id}
					className="blog-style"
					to={`/blogs/${blog.id}`}
				>
					{blog.title}
				</Link>
			))}
		</div>
	);
};

export default Blogs;
