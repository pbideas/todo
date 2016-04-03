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

itemController(app);

app.listen(port);

module.exports = app;