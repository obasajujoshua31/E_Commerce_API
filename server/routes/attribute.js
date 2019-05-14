import { Router } from 'express';
import AttributeController from '../controllers/attribute';


const attributeRouter = Router();

attributeRouter.get('/', AttributeController.getAllAttributes());
attributeRouter.get('/:id', AttributeController.getOneAttribute());

attributeRouter.get('/values/:value_id', AttributeController.getOneAttributeValue());

attributeRouter.get('/inProduct/:product_id', AttributeController.getAllProductAttributes());

export default attributeRouter;
