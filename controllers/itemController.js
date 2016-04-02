'use strict';

var Item = require('../models/item');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/item', function(req, res) {
        Item.find({}, function(err, items) {
            if (err) {
                throw err;
            }
            res.send(items);
        });
    });
    
    app.get('/api/item/:id', function(req, res) {
        Item.findById({ _id: req.params.id }, function(err, item) {
            if (err) {
                throw err;
            }
            res.send(item);
        });
    });
    
    app.post('/api/item', function(req, res) {
       var newItem = Item({
           content: req.body.content,
           isDone: req.body.isDone,
           hasAttachment: req.body.hasAttachment
       });
       newItem.save(function(err) {
          if (err) {
              throw err;
          }
          res.sendStatus(201); 
       });
    });
    
    app.put('/api/item/:id', function(req, res) {
        console.log(req.body);
        Item.findByIdAndUpdate(req.params.id, {
            content: req.body.content,
            isDone: req.body.isDone,
            hasAttachment: req.body.hasAttachment
        }, function(err, item) {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    });
    
    app.delete('/api/item/:id', function(req, res) {
        Item.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    });
};