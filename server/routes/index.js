import { Router } from 'express';
import departmentRouter from './department';
import taxRouter from './tax';

const mainAppRouter = Router();

mainAppRouter.use('/departments', departmentRouter);
mainAppRouter.use('/tax', taxRouter);


export default mainAppRouter;
