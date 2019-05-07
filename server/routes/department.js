import {Router} from 'express';
import DepartmentController from '../controllers/department';

const departmentRouter = Router();

departmentRouter.get('/', DepartmentController.getAllDepartments)

departmentRouter.get('/:id', DepartmentController.getOneDepartment)

export default departmentRouter;
