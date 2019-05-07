import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import models from './models';

const { Department, Category, Shopping_Cart, Shipping } = models;


dotenv.config();
const app = express();

const port = process.env.PORT || 2000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const departments = await Shopping_Cart.findAll();
    return res.status(200).json({
        data: departments
    });
});

// models.sequelize.sync();

app.listen(port, () => {
    console.log('Server started at port', port);
});
