//imports for sever back-end
var path = require('path');
var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');

var userRoutes = require('./apis/auth');
var itemRoutes = require('./apis/item');
var orderRoutes = require('./apis/order');

//Parsers for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Point static path to dist
// TODO 
// app.use(express.static(path.join(__dirname, 'dist')));

//setup api routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
// const forceSSL = function() {
//     return function (req, res, next) {
//         if (req.headers['x-forwarded-proto'] !== 'https') {
//             return res.redirect(['https://', req.get('Host'), req.url].join(''));
//         }
//         next();
//     }
// };

// Instruct the app
// to use the forceSSL
// middleware
// app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
// app.use(express.static(__dirname + '../pos-web/public/index.html'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname + '../pos-web/public/index.html')); laterrrrr

    res.jsonp({status: "API server is running"});
    console.log("hiiiii");
});

// Start the app by listening on the default port configured in config.js
app.listen(process.env.PORT || config.sever_port, function () {
    console.log("server started on port " + config.sever_port);
});