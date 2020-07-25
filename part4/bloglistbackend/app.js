const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

logger.info('connecting to', config.MONGOURI);

mongoose
	.connect(config.MONGOURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
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

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
