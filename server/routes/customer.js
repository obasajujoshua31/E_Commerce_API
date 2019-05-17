import { Router } from 'express';
import validate from '../middlewares/validate';
import CustomerController from '../controllers/customer';
import checkToken from '../middlewares/authenticate';
import findCustomer from '../middlewares/findCustomer';

const customerRouter = Router();

customerRouter.route('/')
    .get(checkToken.verifyUser, findCustomer, CustomerController.getCustomer() )
    .put(checkToken.verifyUser, findCustomer, validate, CustomerController.updateCustomerBiodata());


export default customerRouter;
