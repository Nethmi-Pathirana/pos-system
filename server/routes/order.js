var express = require('express');
var router = express.Router();

var Order = require('../models/order');
var Item = require('../models/item');

router.get('/', function (req, res) {
    Order.find({})
    .populate('items.item')
        .then(x => {console.log('all orders', JSON.stringify(x))})
        .then(orders => res.json(orders));
});

router.get('/:orderID', function (req, res) {
    Order.findById(req.params.orderID, (err, order) => {
        if(!order)
            return res.status(404).json('Not Found'); 
        res.json(order)
    });
});

router.post('/', (req, res) => {
    const newOrder = new Order(req.b5c44b2aa3cb4cf64a9e0b2aaody);
    newOrder.save().then(order => res.json(order));
});

router.put('/add-item/:orderID', (req, res) => {
    Order.findById(req.params.orderID, (err, order) => {
        if(!order)
            return res.status(404).json('Not Found'); 

        let alreadyInList = false;
        order.items.forEach(x => {
            if (x.item.toString() === req.body.itemID) {
                alreadyInList = true;
                x.quantity = req.body.quantity;
                // save order
                order.save((err, savedOrder) => {
                    res.json({success: true, order: savedOrder});
                });
            }
        });
        if(!alreadyInList) {
            Item.findById(req.body.itemID, (err2, item) => {
                if(!item) {
                    next(createError(404, 'Not Found'));
                } else {
                    order.items.push({
                        item: item, 
                        quantity: req.body.quantity
                    });
                    // save order
                    order.save((err, savedOrder) => {
                        res.json({success: true, order: savedOrder});
                    });
                }
            });
        }
    });
});

//TODO
//delete item from order
router.delete('/remove-item/:orderID/:itemID', (req, res) => {
    Order.findById(req.params.orderID)
      .then(order => {
        // Check to see if item exists
        console.log("1");
        if (
          
          order.items.filter(x => x.item.toString() === req.body.itemID).length === 0) {
            console.log("2");
            return res.status(404).json('Item does not exist');
          
        } else {
            console.log("3");
            order.items = order.items.filter(x => x.item.toString() !== req.body.itemID)
            
            // save order
            order.save((err, savedOrder) => {
                res.json({success: true, order: savedOrder});
            });
        }
      })
    //   .catch(err => res.status(404).json('No order found'));
});

module.exports = router;