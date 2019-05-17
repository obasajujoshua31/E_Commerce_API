import { Router } from 'express';
import OrderController from '../controllers/order';
import CheckToken from '../middlewares/authenticate';
import validate from '../middlewares/validate';
import findShipping from '../middlewares/findShipping';
import findTax from '../middlewares/findTax';
import findCart from '../middlewares/findCart';
import confirmOrder from '../middlewares/findOrder';


const orderRouter = Router();

orderRouter.get('/inCustomer', CheckToken.verifyUser, OrderController.getCustomerOrder());

orderRouter.get('/:order_id', CheckToken.verifyUser, 
confirmOrder,
OrderController.getOrderInfo());

orderRouter.post('/', CheckToken.verifyUser, validate, findCart,
   findShipping, findTax, OrderController.postAnOrder());

orderRouter.get('/shortDetail/:order_id', 
CheckToken.verifyUser, confirmOrder, OrderController.getOrderShortDetail());

export default orderRouter;
