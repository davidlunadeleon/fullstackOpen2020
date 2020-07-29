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
		likes: 1
	}
];

const initialUsers = [
	{
		username: 'root',
		name: 'Root User',
		password: 'rootPassword'
	},
	{
		username: 'pepe123',
		name: 'Pepe Gzz',
		password: 'agoodpassword'
	},
	{
		username: 'lalo1209',
		name: 'Lalo Lola',
		password: '212f1f1o21'
	},
	{
		username: 'pepepepepe',
		name: 'Pepepepepe',
		password: 'pepepepepe'
	},
	{
		username: 'notPepe',
		name: 'Not Pepe',
		password: 'thisisnotpepe'
	},
	{
		username: 'awitadecoco',
		name: 'Awita de Coco',
		password: 'awitadecoco9000'
	}
];

const newBlog = {
	title: 'Reflections on Trusting Trust',
	author: 'Ken Thompson',
	url:
		'https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf'
};

const newUser = {
	username: 'davidLuna',
	name: 'David Luna',
	password: '12345'
};

const nonExistingId = async () => {
	const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp' });
	await blog.save();
	await blog.remove();
	return blog.id;
};

const objectsInDb = async (obj) => {
	const listObj = await obj.find({});
	return listObj.map((o) => o.toJSON());
};

module.exports = {
	initialBlogs,
	initialUsers,
	newBlog,
	newUser,
	nonExistingId,
	objectsInDb
};
