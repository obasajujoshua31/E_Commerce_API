import { Router } from 'express';
import ShoppingCartController from '../controllers/shoppingCart';
import validate from '../middlewares/validate';
import findProduct from '../middlewares/findProduct';

const shoppingCartRouter = Router();

shoppingCartRouter.get('/generateUniqueId', ShoppingCartController.generateUniqueId());
shoppingCartRouter.post('/add', validate, findProduct, ShoppingCartController.addProductToCart());


export default shoppingCartRouter;
