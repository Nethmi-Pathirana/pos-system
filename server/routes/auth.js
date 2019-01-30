var jwt = require('jsonwebtoken');

const SECRET = 'supersecret';

exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    if(token){
      jwt.verify(token, SECRET, (err, data) => {
        if(err) {
          req.isAuthenticated = false;
          res.status(403).json("Forbidden");
        } else {
          req.isAuthenticated = true;
          req.user = data;
          next();
        }
        
      });
    } else {
      res.status(401).json("Unauthorized");
    }
};
