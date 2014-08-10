var mongoose = require('mongoose');

var Rant = require('./rant');

var topicSchema = new mongoose.Schema({
	title: {type: String, required: true},

	num_replies: {type: Number, required: true},

	description: {type: String},	

	rants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rant'}]

});

module.exports = mongoose.model('Topic', topicSchema);
