import React from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = () => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					<Blog blog={blog} />
				</div>
			))}
		</div>
	);
};

export default Blogs;
