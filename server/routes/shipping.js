import { Router } from 'express';
import ShippingController from '../controllers/shipping';

const shippingRouter = Router();

shippingRouter.get('/', ShippingController.getAllShippingRegion());
shippingRouter.get('/:shipping_id', ShippingController.getOneShipping());

export default shippingRouter;
