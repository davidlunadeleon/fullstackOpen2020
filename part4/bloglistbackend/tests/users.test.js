const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('No previous users in DB', () => {
	beforeEach(async () => {
		await User.deleteMany({});
	});

	test('Create user returns json', async () => {
		const usersAtStart = await helper.objectsInDb(User);
		const newUser = Object.assign({}, helper.newUser);

		const user = await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const body = user.body;
		delete body.id;
		delete body.blogs;
		delete newUser.password;
		expect(body).toEqual(newUser);

		const usersAtEnd = await helper.objectsInDb(User);
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
	});

	test('Create invalid username returns error', async () => {
		const usersAtStart = await helper.objectsInDb(User);
		const newUser = Object.assign({}, helper.newUser);
		newUser.username = 'ab';

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.objectsInDb(User);
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('Create user with short password returns error', async () => {
		const usersAtStart = await helper.objectsInDb(User);
		const newUser = Object.assign({}, helper.newUser);
		newUser.password = '12';

		const res = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		expect(res.body.error).toEqual(
			'Password length too short! Make it at least 3 characters long.'
		);

		const usersAtEnd = await helper.objectsInDb(User);
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('Create user with short password returns error', async () => {
		const usersAtStart = await helper.objectsInDb(User);
		const newUser = Object.assign({}, helper.newUser);
		delete newUser.password;

		const res = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		expect(res.body.error).toEqual('Password missing.');

		const usersAtEnd = await helper.objectsInDb(User);
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

describe('Previous users in DB', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const userObjects = await helper.initialUsers.map((b) => {
			b.passwordHash = bcrypt.hashSync(b.password, 10);
			delete b.password;
			return new User(b);
		});
		const promiseArray = await userObjects.map((b) => b.save());
		await Promise.all(promiseArray);
	});

	test('Cannot add user with taken username', async () => {
		const newUser = helper.initialUsers[0];
		await api.post('/api/users').send(newUser).expect(400);

		const usersAtEnd = await helper.objectsInDb(User);
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
