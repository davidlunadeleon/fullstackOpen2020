const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const userObjects = await helper.initialUsers.map((b) => {
		const newUser = Object.assign({}, b);
		newUser.passwordHash = bcrypt.hashSync(newUser.password, 10);
		delete newUser.password;
		return new User(newUser);
	});
	const userPromiseArray = await userObjects.map((b) => b.save());
	await Promise.all(userPromiseArray);

	const users = await helper.objectsInDb(User);

	const blogObjects = await helper.initialBlogs.map((b) => {
		const newBlog = Object.assign({}, b);
		const index = Math.floor(Math.random() * users.length);
		newBlog.user = users[index].id;
		return new Blog(newBlog);
	});
	const blogPromiseArray = blogObjects.map((b) => b.save());
	await Promise.all(blogPromiseArray);
});

const api = supertest(app);

const loginUser = async (index) => {
	const user = Object.assign({}, helper.initialUsers[index]);
	delete user.name;
	const res = await api.post('/api/login').send(user);
	const body = res.body;
	return body.token;
};

describe('Saving blogs', () => {
	test('Saving a blog returns json', async () => {
		const newBlog = helper.newBlog;
		const token = await loginUser(0);

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: `bearer ${token}` })
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Blog is saved in DB', async () => {
		const newBlog = helper.newBlog;
		const token = await loginUser(0);

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: `bearer ${token}` });

		const blogsAtEnd = await helper.objectsInDb(Blog);
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
		const token = await loginUser(0);
		blogToPost['likes'] = 100;
		const newBlog = await api
			.post('/api/blogs')
			.send(blogToPost)
			.set({ Authorization: `bearer ${token}` });
		expect(Number(newBlog.body.likes)).toEqual(0);
	});

	test('Verify that missing required fields return error 400', async () => {
		const blogToPost = helper.newBlog;
		const token = await loginUser(0);
		delete blogToPost.url;
		await api
			.post('/api/blogs')
			.send(blogToPost)
			.set({ Authorization: `bearer ${token}` })
			.expect(400);
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
		const blogsAtStart = await helper.objectsInDb(Blog);
		const blogToDelete = blogsAtStart[0];
		const user = await User.findById(blogToDelete.user);
		const users = helper.initialUsers.map((u) => u.username);
		const index = users.indexOf(user.username);
		const token = await loginUser(index);

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: `bearer ${token}` })
			.expect(204);

		const blogsAtEnd = await helper.objectsInDb(Blog);
		expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1);
		const contents = blogsAtEnd.map((b) => b.url);
		expect(contents).not.toContain(blogToDelete.url);
	});

	test('Delete non existing blog', async () => {
		const token = await loginUser(0);
		const blogsAtStart = await helper.objectsInDb(Blog);

		const id = await helper.nonExistingId();
		await api
			.delete(`/api/blogs/${id}`)
			.set({ Authorization: `bearer ${token}` })
			.expect(204);

		const blogsAtEnd = await helper.objectsInDb(Blog);

		expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
	});

	test('Cannot delete blog without authorization', async () => {
		const blogsAtStart = await helper.objectsInDb(Blog);
		const newUser = Object.assign({}, helper.newUser);
		const blogToDelete = blogsAtStart[0];
		await api.post('/api/users').send(newUser);
		const tokenUser = await api.post('/api/login').send(newUser);

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: `bearer ${tokenUser.body.token}` })
			.expect(401);

		const blogsAtEnd = await helper.objectsInDb(Blog);

		expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
	});
});

describe('Updating blogs', () => {
	test('Updating blog returns json', async () => {
		const blogsAtStart = await helper.objectsInDb(Blog);
		const blog = blogsAtStart[0];
		blog.likes = 100;

		await api
			.put(`/api/blogs/${blog.id}`)
			.send(blog)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Update existing blog', async () => {
		const blogsAtStart = await helper.objectsInDb(Blog);
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
		const blogsAtEnd = await helper.objectsInDb(Blog);
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
		const blogsAtStart = await helper.objectsInDb(Blog);
		const blog = blogsAtStart[0];
		blog.likes = 100;
		const id = await helper.nonExistingId();

		await api.put(`/api/blogs/${id}`).send(blog).expect(404);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
