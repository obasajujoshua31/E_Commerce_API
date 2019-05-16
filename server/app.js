import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import redis from 'redis';
import logger from 'morgan';
import mainAppRouter from './routes';


dotenv.config();
const app = express();

const client = redis.createClient();

client.on('error', (error) => {
    console.log('Error', error);
});

const port = process.env.PORT || 2000;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});
app.use('/', mainAppRouter);
app.all('*', (req, res) => {
    return res.status(404).json({
       message: 'End point not found'
    });
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', error => {
    console.log('Uncaught Exception thrown', error);
    // process.exit(1);
  });

app.listen(port, () => {
    console.log('Server started at port', port);
});
