import React from 'react';

const Blogs = ({ blogs }) => {
	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id}>
					{blog.title} {blog.author}
				</div>
			))}
		</div>
	);
};

export default Blogs;
