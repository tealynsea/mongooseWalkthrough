var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var User = require('./models/user.js')

mongoose.connect('mongodb://localhost/wingzingly');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/signup', function(req, res) {

	// creating a new user object from out mongoose model
	var user = new User({
		email: req.body.email
	});
	// save the user to database
	// instance method (see line 33)
	user.save();

	res.send('You have signed up for Wingzingly');
})

app.get('/viewusers', function(req, res) {
	//calling on the constructor
	//static method, not called on an instance(see line 25)
	//use empty object literal ({}) to find all users
	// 1st argument of callback: error objects (or null)
	// 2nd arguent of callback: results
	User.find({}, function(error, users) {

		if(error) {
			res.send(500, 'Error accessing users collection.')
		}
		else {
			//res.send(users)
			res.render('users', {
				customers:users
			})
		}
	})

})

var server = app.listen(3303, function() {
	console.log('Express server listening on port ' + server.address().port);
});
