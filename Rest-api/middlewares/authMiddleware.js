const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth-cookie']; 

    if (!token) {
        return res.status(401).json({ message: 'No authentication token provided' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }

        req.user = decoded; 
        next();
    });
};

module.exports = authMiddleware;
