var app = require('./app');
var config = require('./config');

app.get('/', function(req, res) {
    res.jsonp({status: "Server is running"});
});

// Start the app by listening on the default port configured in config.js
app.listen(process.env.PORT || config.sever_port, function () {
    console.log(`Server started on port ${config.sever_port}`);
});