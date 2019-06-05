
import path from 'path';
import fs from 'fs';
import { sequelize } from '../server/models';


// connect to sequelize
sequelize.authenticate().then(() => {
    console.log('successfully connected');
}).catch(error => {
    console.error('Error in connection', error);
});


// read sql from file
const dir = path.join(__dirname, '../database/tshirtshop.sql');
let sql = fs.readFileSync(dir).toString();

// run query against database
sequelize.query(sql, { raw: false }).then(results => {
    console.log('Successfully created');
}).catch(error => {
    console.error('error', error);
});
