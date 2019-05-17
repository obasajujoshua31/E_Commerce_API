
import path from 'path';
import fs from 'fs';
import { sequelize } from '../server/models';

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
