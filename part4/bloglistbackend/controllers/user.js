const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const User = require('../models/user');

userRouter
	.route('/')
	.post(async (req, res) => {
		const body = req.body;

		if (!('password' in body)) {
			return res.status(400).json({
				error: 'Password missing.'
			});
		} else if (body.password.length < 3) {
			return res.status(400).json({
				error:
					'Password length too short! Make it at least 3 characters long.'
			});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash
		});

		const savedUser = await user.save();
		res.json(savedUser);
	})
	.get(async (req, res) => {
		const users = await User.find({});
		res.json(users);
	});

module.exports = userRouter;
