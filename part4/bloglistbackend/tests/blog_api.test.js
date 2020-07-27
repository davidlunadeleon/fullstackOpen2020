const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = await helper.initialBlogs.map((b) => new Blog(b));
	const promiseArray = blogObjects.map((b) => b.save());
	await Promise.all(promiseArray);
});

const api = supertest(app);

describe('Saving blogs', () => {
	test('Saving a blog returns json', async () => {
		const newBlog = {
			title: 'Reflections on Trusting Trust',
			author: 'Ken Thompson',
			url:
				'https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf'
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Blog is saved in DB', async () => {
		const newBlog = helper.newBlog;

		await api.post('/api/blogs').send(newBlog);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const contents = blogsAtEnd.map((b) => {
			return {
				title: b.title,
				author: b.author,
				url: b.url
			};
		});
		expect(contents).toContainEqual(newBlog);
	});

	test('Verify that the likes property is missing from the request', async () => {
		const blogToPost = helper.newBlog;
		blogToPost['liles'] = 100;
		const newBlog = await api.post('/api/blogs').send(blogToPost);
		expect(Number(newBlog.body.likes)).toEqual(0);
	});
});

describe('Getting blogs', () => {
	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Get all blogs with correct amount', async () => {
		const res = await api.get('/api/blogs');
		expect(res.body).toHaveLength(helper.initialBlogs.length);
	});

	test('Blogs have the id property defined', async () => {
		const allBlogs = await api.get('/api/blogs');
		expect(allBlogs.body[0].id).toBeDefined();
	});
});

afterAll(() => {
	mongoose.connection.close();
});
