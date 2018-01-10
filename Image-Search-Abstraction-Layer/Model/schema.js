var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://your key and pass', {useMongoClient: true});
mongoose.Promise = global.Promise;

var imageStore = mongoose.Schema({search: String, time: Date})
var store = mongoose.model('imageStore', imageStore);

module.exports = store;
