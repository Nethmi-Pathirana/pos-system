var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var schema = new Schema({
    username : {
        type : String, 
        required : true, 
    },
    password : {
        type : String, 
        required : true,
    }
});

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1 });

module.exports = mongoose.model('User', schema);