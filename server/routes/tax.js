import { Router } from 'express';
import TaxController from '../controllers/tax';
import CacheStorage from '../middlewares/checkCache';

const taxRouter = Router();

taxRouter.get('/', CacheStorage.checkCache, TaxController.getAllTaxs);
taxRouter.get('/:id', CacheStorage.checkCache, TaxController.getOneTax);

export default taxRouter;
