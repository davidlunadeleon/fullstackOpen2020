require('dotenv').config();

let PORT = process.env.PORT;
let MONGOURI = process.env.MONGOURI;

module.exports = {
	PORT,
	MONGOURI
};
