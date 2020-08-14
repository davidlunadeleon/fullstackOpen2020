import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = ({ handleLikes, username, showNotification }) => {
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
						showNotification={showNotification}
					/>
				</div>
			))}
		</div>
	);
};

Blogs.propTypes = {
	handleLikes: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
};

export default Blogs;
