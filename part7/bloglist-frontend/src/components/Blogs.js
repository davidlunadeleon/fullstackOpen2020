import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = ({ username }) => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					<Blog blog={blog} username={username} />
				</div>
			))}
		</div>
	);
};

Blogs.propTypes = {
	username: PropTypes.string.isRequired
};

export default Blogs;
