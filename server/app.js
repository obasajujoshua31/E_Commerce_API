import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mainAppRouter from './routes';
import swaggerDocument from './documentation.json';

dotenv.config();
const app = express();


const port = process.env.PORT || 2000;
// Accept cross origin request
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// serve api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', mainAppRouter);

//Catch all unfound requests and return response
app.all('*', (req, res) => {
    return res.status(404).json({
       message: 'End point not found'
    });
});


app.listen(port, () => {
    console.log('Server started at port', port);
});


export default app;
