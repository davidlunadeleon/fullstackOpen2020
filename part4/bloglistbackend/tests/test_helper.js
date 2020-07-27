const Blog = require('../models/blog');

const initialBlogs = [
	{
		title: 'How to make a REST API using Node.js',
		author: 'David Luna',
		url: 'https://example.com/rest-api',
		likes: 0
	},
	{
		title: 'Git Pro',
		author: 'Scott Schacon',
		url: 'https://git-scm.com/book/en/v2',
		likes: 10
	},
	{
		title: 'Clean Code',
		author: 'Robert C. Martin',
		url: 'https://amzn.to/2Hy0n0U',
		likes: 30
	}
];

const nonExistingId = async () => {
	const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp' });
	await blog.save();
	await blog.remove();
	return blog.__id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb
};
