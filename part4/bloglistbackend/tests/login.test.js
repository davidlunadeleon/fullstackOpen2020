const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});

	const userObjects = await helper.initialUsers.map((b) => {
		const newUser = Object.assign({}, b);
		newUser.passwordHash = bcrypt.hashSync(newUser.password, 10);
		delete newUser.password;
		return new User(newUser);
	});
	const promiseArray = await userObjects.map((b) => b.save());
	await Promise.all(promiseArray);
});

describe('Login', () => {
	test('Login returns json and token', async () => {
		const user = Object.assign({}, helper.initialUsers[0]);
		delete user.name;

		const res = await api
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const body = res.body;
		expect(body).toHaveProperty('token');
	});
});

describe('Wrong fields', () => {
	test('Wrong password returns error', async () => {
		const user = Object.assign({}, helper.initialUsers[0]);
		user.password = '123';
		delete user.name;

		const res = await api
			.post('/api/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const body = res.body;
		expect(body.error).toEqual('Invalid username or password');
	});

	test('Wrong username returns error', async () => {
		const user = Object.assign({}, helper.initialUsers[0]);
		user.username = 'ola';
		delete user.name;

		const res = await api
			.post('/api/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const body = res.body;
		expect(body.error).toEqual('Invalid username or password');
	});
});

describe('Missing fields', () => {
	test('Missing password returns error', async () => {
		const user = Object.assign({}, helper.initialUsers[0]);
		delete user.name;
		delete user.password;

		const res = await api
			.post('/api/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const body = res.body;
		expect(body.error).toEqual('Invalid username or password');
	});

	test('Missing username returns error', async () => {
		const user = Object.assign({}, helper.initialUsers[0]);
		delete user.name;
		delete user.username;

		const res = await api
			.post('/api/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const body = res.body;
		expect(body.error).toEqual('Invalid username or password');
	});
});

afterAll(() => {
	mongoose.connection.close();
});
