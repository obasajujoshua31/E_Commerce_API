import { Router } from 'express';
import OrderController from '../controllers/order';
import CheckToken from '../middlewares/authenticate';


const orderRouter = Router();

orderRouter.get('/:order_id', CheckToken.verifyUser, OrderController.getOrderInfo());


export default orderRouter;
