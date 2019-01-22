var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    items : [
        {
            item: {type : Schema.Types.ObjectId, ref: 'Item'},
            quantity: Number
        }
    ],
    status : {
        type : String, 
        required : true,
    }
});

module.exports = mongoose.model('Order', schema);