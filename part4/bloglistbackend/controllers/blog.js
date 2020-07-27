const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter
	.route('/')
	.get(async (req, res) => {
		const blogs = await Blog.find({});
		res.json(blogs);
	})
	.post(async (req, res) => {
		const body = req.body;

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: 0
		});

		const savedBlog = await blog.save();
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
