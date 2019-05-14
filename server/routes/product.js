import { Router } from 'express';
import ProductController from '../controllers/product';
import CacheStorage from '../middlewares/checkCache';
import validate from '../middlewares/validate';
import authenticate from '../middlewares/authenticate';

const productRouter = Router();

productRouter.get('/', CacheStorage.checkCache, ProductController.getAllProducts());
productRouter.get('/search', CacheStorage.checkCache, ProductController.searchProducts());
productRouter.get('/:id', CacheStorage.checkCache, ProductController.getOneProduct());

productRouter.get('/inCategory/:category_id', CacheStorage.checkCache,
        ProductController.getProductsByCategory());
productRouter.get('/inDepartment/:department_id', 
    CacheStorage.checkCache,
    ProductController.getProductsByDepartment());

productRouter.get('/:id/details', CacheStorage.checkCache,
        ProductController.getOneProduct());

productRouter.get('/:id/locations', 
    CacheStorage.checkCache,
    ProductController.getProductsLocation());

productRouter.route('/:product_id/reviews')
    .get(CacheStorage.checkCache, ProductController.getProductsReviews())
    .post(validate, authenticate.verifyUser, ProductController.addProductsReviews());

export default productRouter;
