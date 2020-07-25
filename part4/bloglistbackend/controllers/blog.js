const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter
	.route('/')
	.get((req, res, next) => {
		Blog.find({})
			.then((blogs) => res.json(blogs))
			.catch((error) => next(error));
	})
	.post((req, res, next) => {
		const body = req.body;

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: Number(body.likes) || 0
		});

		blog.save()
			.then((savedBlog) => res.json(savedBlog))
			.catch((error) => next(error));
	});

module.exports = blogRouter;
