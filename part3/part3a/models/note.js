const mongoose = require('mongoose');

const url = process.env.MONGOURI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('connection successful!');
	})
	.catch((error) => {
		console.log(
			'error while establishing connection to MongoDB',
			error.message
		);
	});

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Note', noteSchema);
