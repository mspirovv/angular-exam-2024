    const express = require('express');
    const router = express.Router();
    const productController = require('../controllers/productController');
    const { auth } = require('../utils');


    
    router.post('/' , auth() ,productController.createProduct);
    router.get('/', productController.getProducts);
    router.get('/', productController.getUserProducts);
    router.get('/top-products', productController.getTopProducts);
    router.post('/:id/like', productController.likeProduct); 
    router.post('/:id/unlike', productController.unlikeProduct); 
    router.get('/search', productController.searchProducts);
    router.get('/:productId', productController.getProduct);
    router.put('/:productId', productController.editProduct);
    router.delete('/:productId', productController.deleteProduct);

   
 

    module.exports = router;