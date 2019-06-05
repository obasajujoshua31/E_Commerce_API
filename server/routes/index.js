import { Router } from 'express';
import departmentRouter from './department';
import taxRouter from './tax';
import shippingRouter from './shipping';
import attributeRouter from './attribute';
import categoryRouter from './category';
import productRouter from './product';
import customersRouter from './customers';
import customerRouter from './customer';
import orderRouter from './order';
import shoppingCartRouter from './shoppingCart';
import paymentRouter from './payment';
import CacheStorage from '../middlewares/checkCache';
import queue from '../worker/worker';

const mainAppRouter = Router();

// Main App Router
mainAppRouter.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Joshua E_Commerce API'
    });
});
mainAppRouter.use('/departments', CacheStorage.checkCache, departmentRouter);
mainAppRouter.use('/tax', CacheStorage.checkCache, taxRouter);
mainAppRouter.use('/shipping/regions', CacheStorage.checkCache, shippingRouter);
mainAppRouter.use('/attributes', CacheStorage.checkCache, attributeRouter);
mainAppRouter.use('/categories', CacheStorage.checkCache, categoryRouter );
mainAppRouter.use('/products', productRouter);
mainAppRouter.use('/customers', customersRouter);
mainAppRouter.use('/customer', customerRouter);
mainAppRouter.use('/orders', orderRouter);
mainAppRouter.use('/shoppingcart', shoppingCartRouter);  
mainAppRouter.use('/stripe', paymentRouter);

export default mainAppRouter;
