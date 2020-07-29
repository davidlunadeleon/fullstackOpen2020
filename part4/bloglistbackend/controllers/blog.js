const blogRouter = require('express').Router();
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

		const users = await User.find({});
		const user = users[0];

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
		res.json(savedBlog);
	});

blogRouter
	.route('/:id')
	.delete(async (req, res) => {
		await Blog.findByIdAndRemove(req.params.id);
		res.status(204).end();
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
	});

module.exports = blogRouter;
