const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter
	.route('/')
	.get(async (req, res) => {
		const blogs = await Blog.find({}).populate('user', {
			name: 1,
			username: 1
		});
		res.json(blogs);
	})
	.post(async (req, res) => {
		const body = req.body;
		const decodedToken = jwt.verify(req.token, process.env.SECRET);
		if (!req.token || !decodedToken.id) {
			return res.status(401).json({ error: 'Token missing or invalid.' });
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: 0,
			user: user._id
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		const savedBlogFormatted = await Blog.findById(
			savedBlog.id
		).populate('user', { name: 1, username: 1 });

		res.json(savedBlogFormatted);
	});

blogRouter
	.route('/:id')
	.delete(async (req, res) => {
		const decodedToken = jwt.verify(req.token, process.env.SECRET);
		const user = await User.findById(decodedToken.id);
		const blog = await Blog.findById(req.params.id);
		if (!blog) {
			return res.status(204).end();
		}
		if (
			!req.token ||
			!decodedToken.id ||
			user._id.toString() !== blog.user.toString()
		) {
			return res.status(401).json({ error: 'Token missing or invalid.' });
		}
		await Blog.findByIdAndRemove(req.params.id);
		user.blogs = user.blogs.filter((b) => b.toString() !== req.params.id);
		await User.findByIdAndUpdate({ _id: user._id }, user);
		return res.status(204).end();
	})
	.put(async (req, res) => {
		const body = req.body;
		const newBlog = {
			author: body.author,
			url: body.url,
			title: body.title,
			likes: body.likes
		};
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.params.id,
			newBlog,
			{ new: true }
		);
		if (updatedBlog) {
			res.json(updatedBlog);
		} else {
			res.status(404).end();
		}
	})
	.get(async (req, res) => {
		const blog = await Blog.findById(req.params.id).populate('user', {
			name: 1,
			username: 1
		});
		res.json(blog);
	});

blogRouter.route('/:id/comments').post(async (req, res) => {
	const body = req.body;
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'Token missing or invalid.' });
	}

	const blog = await Blog.findById(req.params.id);
	if (!blog) {
		return res.status(404).end();
	}
	blog.comments = blog.comments.concat(body.comment);
	await blog.save();

	const savedBlogFormatted = await Blog.findById(blog.id).populate('user', {
		name: 1,
		username: 1
	});

	res.json(savedBlogFormatted);
});

module.exports = blogRouter;
