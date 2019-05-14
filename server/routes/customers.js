import { Router } from 'express';
import validate from '../middlewares/validate';
import CustomerController from '../controllers/customer';
import checkEmail from '../middlewares/checkEmail';
import authenticate from '../middlewares/authenticate';
import findCustomer from '../middlewares/findCustomer';

const customersRouter = Router();

customersRouter.post('/', validate, 
    checkEmail,
    CustomerController.registerCustomer());

customersRouter.post('/login', validate,
    CustomerController.loginCustomer());

customersRouter.put('/creditCard', authenticate.verifyUser, 
    findCustomer,
    validate,
    CustomerController.updateCustomerCreditCard());

customersRouter.put('/address', authenticate.verifyUser, 
        findCustomer, validate,
            CustomerController.updateCustomerAddress());

export default customersRouter;
