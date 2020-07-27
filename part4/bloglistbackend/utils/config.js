require('dotenv').config();

let PORT = process.env.PORT;
let MONGOURI = process.env.MONGOURI;

if (process.env.NODE_ENV === 'test') {
	MONGOURI = process.env.TEST_MONGOURI;
}

module.exports = {
	PORT,
	MONGOURI
};
