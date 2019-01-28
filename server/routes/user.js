var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

const SECRET = 'supersecret';

router.post('/register', (req, res) => {

  // checks the existance of given username 
  User.findOne({username: req.body.username}).then(user => {
    if(user) 
      return res.status(400).json('Username already exists');
    
    const newUser = new User(req.body);  

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post('/login', (req, res) => {

  // Find user by username
  User.findOne({username: req.body.username}).then(user => {
    if(!user) 
    return res.status(404).json('User not found');
    
    // Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // Sign Token
        jwt.sign(user._doc, SECRET, { expiresIn: 3600*5 }, (err, token) => {
          res.json({ success: true, token: token});
        });      
      } else {
        return res.status(401).json('Password incorrect');
      }
    });
  });
});

router.get('/logout', (req, res) => {
  res.jsonp({success: true});
});

module.exports = router;