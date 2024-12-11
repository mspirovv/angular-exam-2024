const { userModel } = require('../models');
const { Product: Product } = require('../models/productModel');  
const mongoose = require('mongoose');

// function getProducts(req, res, next) {
//     const { category } = req.query; 

//     let query = {};
//     if (category) {
//         query.productCategory = category; 
//     }

//     Product.find(query)
//         .populate('userId')
//         .then(products => res.json(products))
//         .catch(next);
// }

function getProducts(req, res, next) {
    const { category, page = 1, limit = 12 } = req.query; 

    const query = {};
    if (category) {
        query.productCategory = category;
    }
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);

    const skip = (pageNumber - 1) * pageLimit;
    Product.find(query)
        .populate('userId')
        .skip(skip) 
        .limit(pageLimit) 
        .then(products => {
            
            Product.countDocuments(query).then(totalProducts => {
                const totalPages = Math.ceil(totalProducts / pageLimit); 
                res.json({
                    products,
                    totalPages, 
                    currentPage: pageNumber,
                    totalProducts, 
                });
            });
        })
        .catch(next);
}


function getProduct(req, res, next) {
    const { productId } = req.params;

    Product.findById(productId)
        .populate('userId')
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            next(error);
        });
}



// Функция за извличане на продуктите на конкретен потребител
const getUserProducts = async (req, res) => {
    try {
        const userId = req.user._id; // Вземаме ID на потребителя от токена (или сесията)
        
        // Търсим продуктите на потребителя по userId
        const products = await Product.find({ userId: userId });

        // Връщаме продуктите като отговор
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};




searchProducts = async (req, res) => {
    try {
        const query = req.query.query || ''; // Търсене по име или категория
        const page = parseInt(req.query.page) || 1; // Номер на страницата
        const limit = parseInt(req.query.limit) || 10; // Брой продукти на страница

        const searchQuery = {
            $or: [
                { productName: { $regex: query, $options: 'i' } }, // Търсене по име
                { category: { $regex: query, $options: 'i' } }     // Търсене по категория
            ]
        };

        const skip = (page - 1) * limit; // Пропускане на предходните страници

        // Взимане на резултати с пагинация
        const products = await Product.find(searchQuery)
            .populate('userId') // Ако има нужда да попълните потребителска информация
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(searchQuery); // Общо продукти, които отговарят на търсенето

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


function createProduct(req, res, next) {
    const { productName, description, productCategory, productImage } = req.body;
    const { _id: userId } = req.user; 

    Product.create({
        productName,
        description,
        productCategory,
        productImage,
        userId
    })
        .then(product => {
            return userModel.findByIdAndUpdate(
                userId,
                { $push: { products: product._id } }, 
                { new: true, useFindAndModify: false } 
            ).then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
                return product; 
            });
        })
        .then(product => {
        
            res.status(201).json(product);
        })
        .catch(err => {
            next(err);
        });
}
function editProduct(req, res, next) {
    const { productId } = req.params;
    const { _id: userId } = req.user;  
    const { productName, description, productCategory, productImage } = req.body;

    
    if (!productName || !description || !productCategory || !productImage) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }

            if (product.userId.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'You are not authorized to edit this product!' });
            }
            product.productName = productName;
            product.description = description;
            product.productCategory = productCategory;
            product.productImage = productImage;

            return product.save();
        })
        .then(updatedProduct => {
            res.json(updatedProduct);  
        })
        .catch(err => {
            console.error('Error during product update:', err); 
            res.status(500).json({ message: 'Internal server error' });
        });
}


function deleteProduct(req, res, next) {
    const { productId } = req.params;

    Product.findByIdAndDelete(productId)
        .then(() => res.status(204).send()) 
        .catch(next);
}


const likeProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.body.userId;

        console.log('Параметър на продукта:', productId);
        console.log('Тяло на заявката:', req.body);

       
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Продуктът не е намерен' });
        }

        
        if (product.likesCount.includes(userId)) {
            product.likesCount = product.likesCount.filter(id => id.toString() !== userId.toString());
        } else {
            
            product.likesCount.push(userId);
        }

       
        await product.save();

        
        res.status(200).json({ likesCount: product.likesCount });
    } catch (error) {
        console.error('Грешка в likeProduct:', error);
        res.status(500).json({ message: 'Грешка при обработката на лайковете' });
    }
};

const getTopProducts = async (req, res) => {
    try {
      // Извличаме продуктите и ги сортираме по брой лайкове (по спадащ ред)
      const topProducts = await Product.aggregate([
        {
          $project: {
            _id: 1,
            productName: 1,
            productImage: 1,
            likesCount: 1
          }
        },
        {
          $addFields: {
            // Ако likesCount е липсващо или null, задаваме празен масив или 0
            likesCountLength: { $size: { $ifNull: ["$likesCount", []] } }
          }
        },
        {
          $sort: { likesCountLength: -1 } // Сортираме по броя на лайковете (в низходящ ред)
        },
        { $limit: 5 } // Ограничаваме резултатите до първите 5
      ]);
  
      // Връщаме топ 5 продуктите
      res.status(200).json(topProducts);
    } catch (error) {
      console.error('Грешка при извличането на топ продуктите:', error);
      res.status(500).json({ message: 'Грешка при извличането на топ продуктите' });
    }
};

  
async function unlikeProduct(req, res) {
    try {
        const { id: productId } = req.params;
        const { userId } = req.body; 

        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Невалиден продукт ID' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'Липсва потребителско ID' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Продуктът не е намерен' });
        }

      
        const userIndex = product.likesCount.indexOf(userId);
        if (userIndex === -1) {
            return res.status(400).json({ message: 'Не сте лайкнали този продукт' });
        }

        
        product.likesCount.splice(userIndex, 1);
        await product.save();

        res.status(200).json({ message: 'Продуктът е ънлайкнат', likesCount: product.likesCount });
    } catch (err) {
        console.error('Грешка при ънлайкване:', err);
        res.status(500).json({ message: 'Грешка при ънлайкване', error: err.message });
    }

    
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    searchProducts,
    getUserProducts,
    likeProduct,
    unlikeProduct,
    getTopProducts
};
