'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var itemController = require('./controllers/itemController');

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

mongoose.connect(config.getDbConnectionString());

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

itemController(app);

app.listen(port);

module.exports = app;