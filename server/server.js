//imports for sever back-end
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var config = require('./config');
var userRoutes = require('./routes/auth');
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
    'Content-type,Accept,X-Access-Token,X-Key',
);
if (req.method === 'OPTIONS') {
    res.status(200).end();
} else {
    next();
}
});

//Point static path to dist
// TODO 
// app.use(express.static(path.join(__dirname, 'dist')));

//setup api routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.jsonp({error: err});
});

app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname + '../pos-web/public/index.html')); laterrrrr
    res.jsonp({status: "Server is running"});
});

// Start the app by listening on the default port configured in config.js
app.listen(process.env.PORT || config.sever_port, function () {
    console.log(`Server started on port ${config.sever_port}`);
});