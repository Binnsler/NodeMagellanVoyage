// The 'voyage' array of location objects
var voyage = require('./models/voyage.json');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


// On home page load, redirect to Seville (then begin dynamic route on navigation)
app.get('/', function(req, res){
	res.redirect('seville')
})

// Dynamic route based on current location
app.get('/:location', function(req, res){

	// Get the name of the current location (currentName)
	var currentLoc = req.params.location;

	// Filter through voyage.json to find the current location object
	var locationObject = voyage.filter(function(element){
		return element.currentLocation === currentLoc;
	})

	// Render current location using locationTemplate
	res.render('locationTemplate', locationObject[0]);

});

var server = app.listen(8916, function() {
	console.log('Express server listening on port ' + server.address().port);
});
