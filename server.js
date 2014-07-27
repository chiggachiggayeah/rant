var express = require('express');

var app = express();

var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds053459.mongolab.com:53459/rantdb');

var mongoose = require('mongoose');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');
//var db = require('');

var port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/public'));


var Rant = require('/models/rant');

app.use(bodyParser());


var router = express.Router();

router.get('/', function(req, res){
	res.sendfile('index.html')	
});
//model stuff

app.use('/api', router);

//user schema
var Rant = mongoose.model('Rant', rantSchema);

//you're going to have to handle all of the HTTP stuff from the db







//start

app.listen(port);

console.log("Up and Running on 8080");

exports.app = app;


