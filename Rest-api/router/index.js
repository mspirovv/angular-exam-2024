const router = require('express').Router();
const users = require('./users');
const test = require('./test');
const products = require('./product')
const { authController } = require('../controllers');




router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/products',products);
router.use('/test', test);

module.exports = router;
