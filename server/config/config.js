import dotenv from 'dotenv';

dotenv.config();
const 
  { CLIENT_SECRET, DIALECT, DATABASE_URL, 
    PRODUCTION_URL, TEST_URL, PASSWORD, HOST, USERNAME, DATABASE } = process.env;

export default {
  development: {
    database: DATABASE,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      multipleStatements: true
    }
  },
  test: {
    database: DATABASE,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      multipleStatements: true
    }
  },
   appSecret: CLIENT_SECRET,

   production: {
    database: DATABASE,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      multipleStatements: true
    }
}
};
