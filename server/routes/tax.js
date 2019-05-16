import { Router } from 'express';
import TaxController from '../controllers/tax';

const taxRouter = Router();

taxRouter.get('/', TaxController.getAllTaxes());
taxRouter.get('/:id', TaxController.getTax());

export default taxRouter;
