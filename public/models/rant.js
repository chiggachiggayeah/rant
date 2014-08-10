var mongoose = require('mongoose');

var Topic = require('./topic');

var RantSchema = new mongoose.Schema({
	title: { type: String, required: true }, 

	author: { type: String, required: true },
	
	content: { type: String, required: true },

});

module.exports = mongoose.model('Rant', RantSchema);
