const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const User = require('../models/user');

userRouter.route('/').post(async (req, res) => {
	const body = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	});

	const savedUser = await user.save();
	res.json(savedUser);
});

module.exports = userRouter;
