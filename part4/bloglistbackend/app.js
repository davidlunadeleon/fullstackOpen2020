const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

const blogsRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

logger.info('connecting to', config.MONGOURI);

mongoose
	.connect(config.MONGOURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		logger.info('connection successful!');
	})
	.catch((error) => {
		logger.error(
			'error while establishing connection to MongoDB',
			error.message
		);
	});

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	console.log('Testing endpoint enabled');
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
