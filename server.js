var express = require('express');

var app = express();

var mongoose = require('mongoose');

var morgan = require('morgan');

var methodOverride = require('method-override');
//connect to database
mongoose.connect('jkhall:bonsauvage@ds053459.mongolab.com:53459/rantdb');

var bodyParser = require('body-parser');
//var db = require('');

var port = process.env.PORT || 8080;

var Rant = require('./public/models/rant');

var Topic = require('./public/models/topic');

var session = require('express-session');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(methodOverride());

var router = express.Router();

//<---------------Rant Routes----------------------->
router.route('/rants')
	.post(function(req, res){  //validations for post
		var rant = new Rant();
		rant.content = req.body.content;
		rant.title = req.body.title;
		rant.author = req.body.author;
		rant.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'New Rant Created'});
		
		});
	})
	.get(function(req, res){
		Rant.find(function(err, rants){
			if(err)
				res.send(err);
			res.json(rants);
		});
	});

router.route('/rants/:rant_id')
	.get(function(req, res){
		Rant.findById(req.params.rant_id, function(err, rant){
			if(err)
				res.send(err);
			res.json(rant);
		});
	})
	.put(function(req, res){
		Rant.findById(req.params.rant_id, function(err, rant){
			if(err)
				res.send(err);
			rant.title = req.body.title;
			rant.author = req.body.author;
			rant.content = req.body.content;
			rant.save(function(err){
				if(err)
					res.send(err);
				res.json({message:"Rant Updated"});
			});
		});
	})
	.delete(function(req, res){
		Rant.remove({
			_id: req.params.rant_id
		}, function(err, rant){
			if(err)
				res.send(err);
			res.json({message: "Rant deleted"});
		});		
	});

//<------------------End Rant Routes--------------------------------------------->
//<------------------Topic Routes------------------------------------------------>
router.route('/topics')
	.post(function(req, res){
		var topic = new Topic();
		topic.title = req.body.title;
		topic. num_replies = req.body.num_replies;
		topic.rants = req.body.rants;
		topic.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'New topic made'});
		});
	})
	.get(function(req, res){
		Topic.find(function(err, topics){
			if(err)
				res.send(err);
			res.json(topics);
		});
	});

router.route('/topics/:topic_id')
	.get(function(req, res){
		Topic.findById(req.params.topic_id, function(err, topic){
			if(err)
				res.send(err);

			res.json(topic);
		});
	})
	.put(function(req, res){
		Topic.findById(req.params.topic_id, function(err, topic){
			if(err)
				res(err);
			topic.title = req.body.title;
			topic.num_replies = req.body.num_replies;
			topic.rants = req.body.rants;
			topic.save(function(err){
				if(err)
					res.send(err);
				res.json({message: 'Topic Updated'})
			});
		});
	})
	.delete(function(req, res){
		Topic.remove({
			_id: req.params.topic_id
		}, function(err, topic){
			if(err)
				res.send(err);
			res.json({message: 'Topic deleted'});
		});
	});

//I think that this might be the way to do the rant topic relationship

router.route('/topics/:topic_id/rants')
	.get(function(req, res){
		Topic.findById(req.params.topic_id, function(err, topic){
			if(err)
				res.send(err);
			res.json(topic);
		})
		.populate('rants')
		.exec(function(err, rants){
			if(err)
				res.send(err);
			res.json(rants);
		});
	});
	
//<------------------End Topic Routes-------------------------------------------->
//Schema Methods----------------------------------------------------------------->
//I believe that we can directly call functions on Schema's now after calling populate bc this is actually the mongoose doc

router.get('/', function(req, res){
	res.json({message: 'yo dawg!'});	
});
//model stuff

//register routes
app.use('/api', router);

app.get('*', function(req, res){
	res.sendfile("./public/index.html");
});
//user schema








//start

app.listen(port);

console.log("Up and Running on 8080");

exports.app = app;


