import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
	return (
		<ul className="list-group">
			{blogs.map((blog) => (
				<li
					key={blog.id}
					className="list-group-item list-group-item-action"
				>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</li>
			))}
		</ul>
	);
};

export default Blogs;
