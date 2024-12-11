// authenticateUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

function authenticateUser(req, res, next) {
 
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
а
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }


    req.user = decoded;
    next(); 
  });
}

module.exports = authenticateUser;
