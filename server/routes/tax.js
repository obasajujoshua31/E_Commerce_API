import { Router } from 'express';
import TaxController from '../controllers/tax';

const taxRouter = Router();

taxRouter.get('/', TaxController.getAllTaxs());
taxRouter.get('/:id', TaxController.getOneTax());

export default taxRouter;
