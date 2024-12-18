    const express = require('express');
    const router = express.Router();
    const productController = require('../controllers/productController');
    const { auth } = require('../utils');


    
    router.post('/' , auth() ,productController.createProduct);
    router.get('/', productController.getProducts);
    router.get('/user/:userId', productController.getUserProducts);
    router.get('/top-products', productController.getTopProducts);
    router.post('/:id/like', auth(),productController.likeProduct); 
    router.post('/:id/unlike',auth(), productController.unlikeProduct); 
    router.get('/search', productController.searchProducts);
    router.get('/:productId', productController.getProduct);
    router.put('/:productId',auth(), productController.editProduct);
    router.delete('/:productId',auth(), productController.deleteProduct);

   
 

    module.exports = router;