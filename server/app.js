import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import mainAppRouter from './routes';


dotenv.config();
const app = express();

const port = process.env.PORT || 2000;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainAppRouter);

app.listen(port, () => {
    console.log('Server started at port', port);
});
