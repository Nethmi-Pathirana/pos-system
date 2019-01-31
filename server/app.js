//imports for sever back-end
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var userRoutes = require('./routes/user');
var itemRoutes = require('./routes/item');
var orderRoutes = require('./routes/order');

var app = express();

//Parsers for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/pos', {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors());

//setup api routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

module.exports = app;