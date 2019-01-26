var express = require('express');
var router = express.Router();

var Order = require('../models/order');
var Item = require('../models/item');

// Get all open orders
router.get('/', (req, res) => {
    Order.find({})
        .populate('items.item')
        .then(orders => {
            orders = orders.filter(x => x.status.toString() === "open")
            res.json(orders);
        });
});

// Get an order specified by orderID
router.get('/:orderID', (req, res) => {
    Order.findById(req.params.orderID)
        .populate('items.item')
        .then(order =>
            res.json({ order: order })
        );
});

// Add order
router.post('/', (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save().then(order => res.json(order));
});

// Change order status
router.put('/:id', (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.status = "closed";
            // save order
            order.save((err, savedOrder) => {
                res.json(savedOrder);
            });

        })
});

// Update order (add item to order/ update quatity of an item)
router.put('/add-item/:orderID', (req, res) => {
    Order.findById(req.params.orderID)
        .populate('items.item')
        .then(order => {
            if (!order)
                return res.status(404).json('Order Not Found');

            let alreadyInList = false;
            order.items.forEach(x => {
                if (x.item._id.toString() === req.body.itemID) {
                    alreadyInList = true;
                    x.quantity = req.body.quantity;
                    // save order
                    order.save((err, savedOrder) => {
                        res.json({ order: savedOrder });
                    });
                }
            });
            if (!alreadyInList) {
                Item.findById(req.body.itemID, (err2, item) => {
                    if (!item) {
                        next(createError(404, 'Item Not Found'));
                    } else {
                        order.items.push({
                            item: item,
                            quantity: req.body.quantity
                        });
                        // save order
                        order.save((err, savedOrder) => {
                            res.json({ order: savedOrder });
                        });
                    }
                });
            }
        });
});

// Delete item from order
router.delete('/remove-item/:orderID/:itemID', (req, res) => {
    Order.findById(req.params.orderID)
        .populate('items.item')
        .then(order => {
            // Check to see if item exists
            if (order.items.filter(x => x.item._id.toString() === req.params.itemID).length === 0) {
                return res.status(404).json('Item does not exist');
            } else {
                order.items = order.items.filter(x => x.item._id.toString() !== req.params.itemID)
                // save order
                order.save((err, savedOrder) => {
                    res.json({ order: savedOrder });
                });
            }
        })
});

module.exports = router;