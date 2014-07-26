var express = require('express');

var app = express();

var mongoose = require('mongoose');

//var db = require('');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
	res.sendfile("index.html");
});
//model stuff

var rantSchema = new mongoose.Schema({
	title: String,

	author: String,

	content: String,

	createdOn: Date
});

var Rant = mongoose.model('Rant', rantSchema);

//you're going to have to handle all of the HTTP stuff from the db
app.get('/api/')


//start

app.listen(port);

console.log("Up and Running on 8080");

exports = module.exports = app;
