import { Router } from 'express';
import PaymentController from '../controllers/payment';
import validate from '../middlewares/validate';


const paymentRouter = Router();

paymentRouter.post('/charge', validate, PaymentController.chargeCustomer());

export default paymentRouter;
