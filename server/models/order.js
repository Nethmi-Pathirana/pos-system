var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
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

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderId', startAt: 1 });

module.exports = mongoose.model('Order', schema);