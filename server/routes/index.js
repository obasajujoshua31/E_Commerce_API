import { Router } from 'express';
import departmentRouter from './department';

const mainAppRouter = Router();

mainAppRouter.use('/departments', departmentRouter)


export default mainAppRouter;
