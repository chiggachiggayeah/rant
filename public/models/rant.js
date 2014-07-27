var mongoose = require('mongoose');

var RantSchema = new mongoose.Schema({
	title: String,

	author: String,
	
	content: String,

	createdOn: Date
});

module.exports = mongoose.model('Rant', RantSchema);
