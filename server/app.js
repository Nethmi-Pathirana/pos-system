//imports for sever back-end
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

app.all('/*', (req, res, next) => {
// CORS headers
res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// Set custom headers for CORS
res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Access-Token,X-Key,Authorization',
);
if (req.method === 'OPTIONS') {
    res.status(200).end();
} else {
    next();
}
});

//setup api routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

module.exports = app;