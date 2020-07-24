const mongoose = require('mongoose');
const uniqueValitator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGOURI;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then((result) => {
		console.log('Connection to MongoDB successful');
	})
	.catch((error) => {
		console.log('Error: connection to MongoDB failed', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	number: {
		type: String,
		unique: true,
		required: true
	}
});
personSchema.plugin(uniqueValitator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);
