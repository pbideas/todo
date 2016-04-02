'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    content: String,
    isDone : Boolean,
    hasAttachment: Boolean
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;