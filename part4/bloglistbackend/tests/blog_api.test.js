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
		const newBlog = helper.newBlog;

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

	test('Verify that missing required fields return error 400', async () => {
		const blogToPost = helper.newBlog;
		delete blogToPost.url;
		await api.post('/api/blogs').send(blogToPost).expect(400);
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
		expect(allBlogs.body[0]._id).not.toBeDefined();
	});
});

describe('Deleting blogs', () => {
	test('Delete existing blog', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1);

		const contents = blogsAtEnd.map((b) => b.url);
		expect(contents).not.toContain(blogToDelete.url);
	});

	test('Delete non existing blog', async () => {
		const blogsAtStart = await helper.blogsInDb();

		const id = await helper.nonExistingId();
		await api.delete(`/api/blogs/${id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
	});
});

describe('Updating blogs', () => {
	test('Updating blog returns json', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blog = blogsAtStart[0];
		blog.likes = 100;

		await api
			.put(`/api/blogs/${blog.id}`)
			.send(blog)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Update existing blog', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blog = blogsAtStart[0];
		blog.likes = 100;

		const updatedBlogJson = await api
			.put(`/api/blogs/${blog.id}`)
			.send(blog);

		const updatedBlog = {
			author: updatedBlogJson.body.author,
			url: updatedBlogJson.body.url,
			likes: Number(updatedBlogJson.body.likes),
			title: updatedBlogJson.body.title
		};
		const blogsAtEnd = await helper.blogsInDb();
		const contents = blogsAtEnd.map((b) => {
			return {
				author: b.author,
				url: b.url,
				likes: b.likes,
				title: b.title
			};
		});

		expect(contents).toContainEqual(updatedBlog);
	});

	test('Update non exiting blog', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blog = blogsAtStart[0];
		blog.likes = 100;
		const id = await helper.nonExistingId();

		await api.put(`/api/blogs/${id}`).send(blog).expect(404);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
