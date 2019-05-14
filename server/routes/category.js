import { Router } from 'express';
import CategoryController from '../controllers/category';


const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getAllCategories());
categoryRouter.get('/:id', CategoryController.getOneCategory());
categoryRouter.get('/inProduct/:product_id', CategoryController.getCategoryByProduct());
categoryRouter.get('/inDepartment/:department_id', CategoryController.getCategoryByDepartment());


export default categoryRouter;
