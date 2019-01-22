var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function (req, res) {
    Item.find()
      .then(items => res.json(items));
});

router.get('/:id', function (req, res) {
    Item.findById(req.params.id, (err, item) => {
        if(!item)
            return res.status(404).json('Not Found'); 
        res.jsonp(item)
    });
});

router.post('/', (req, res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;