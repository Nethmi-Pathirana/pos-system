var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {
        type : String, 
        required : true, 
    },
    price : {
        type : Number, 
        required : true,
    }, 
    description: {
        type: String
    }
});

module.exports = mongoose.model('Item', schema);