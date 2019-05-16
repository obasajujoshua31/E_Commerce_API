import { Router } from 'express';
import ShoppingCartController from '../controllers/shoppingCart';
import validate, { validateUpdateCart } from '../middlewares/validate';
import findProduct from '../middlewares/findProduct';
import findCart, { findItem } from '../middlewares/findCart';

const shoppingCartRouter = Router();

shoppingCartRouter.get('/generateUniqueId', ShoppingCartController.generateUniqueId());
shoppingCartRouter.post('/add', validate, findProduct, ShoppingCartController.addProductToCart());
shoppingCartRouter.get('/:cart_id', ShoppingCartController.getItemsFromCart() );
shoppingCartRouter.put('/update/:item_id', 
    validateUpdateCart(), findItem, ShoppingCartController.updateItemInCart() );

shoppingCartRouter.get('/totalAmount/:cart_id', 
    ShoppingCartController.getTotalAmountFromCart());
shoppingCartRouter.get('/saveForLater/:item_id', 
    findItem, ShoppingCartController.saveProductForLater() );

shoppingCartRouter.get('/getSaved/:cart_id', ShoppingCartController.getItemsSavedForLater() );
shoppingCartRouter.get('/moveToCart/:item_id', findItem, ShoppingCartController.moveToCart());
    shoppingCartRouter.delete('/removeProduct/:item_id', 
    findItem, ShoppingCartController.removeItemFromCart());

shoppingCartRouter.delete('/empty/:cart_id', ShoppingCartController.emptyCart());
export default shoppingCartRouter;
