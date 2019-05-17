 import Sequelize from 'sequelize';
import dbConfig from '../server/config/config';

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV;
const config = dbConfig[env];
const sequelize = new Sequelize(config.url, { logging: false });

// const { sequelize } = models;

sequelize.authenticate().then(() => {
    console.log('successfully connected');
}).catch(error => {
    console.error('Error in connection', error);
});

const dir = path.join(__dirname, '../database/tshirtshop.sql');
let sql = fs.readFileSync(dir).toString();

sequelize.query(sql, { raw: false }).then(results => {
    console.log('Successfully created');
}).catch(error => {
    console.error('error', error);
});

// console.log('!!!!', models.default.sequelize.Sequelize.query);
