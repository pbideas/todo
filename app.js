'use strict';

var express = require('express');
var app = express();

var port = 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.listen(port);