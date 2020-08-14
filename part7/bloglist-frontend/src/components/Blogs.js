import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = ({ handleLikes, username, handleDelete }) => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} className="blog-style">
					<Blog
						blog={blog}
						handleLikes={handleLikes}
						username={username}
						handleDelete={handleDelete}
					/>
				</div>
			))}
		</div>
	);
};

Blogs.propTypes = {
	blogs: PropTypes.array.isRequired,
	handleLikes: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default Blogs;
