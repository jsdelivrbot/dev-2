var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');

var db = 'mongodb://localhost/example';
mongoose.connect(db);
var port=8080;

app.listen(port, function(){
  console.log('app listening on port: '+ port);
});
