import dotenv from 'dotenv';

dotenv.config();
const 
  { CLIENT_SECRET, DIALECT, DATABASE_URL, 
    PRODUCTION_URL, TEST_URL, PASSWORD, HOST, USERNAME, DATABASE } = process.env;

export default {
development: {
    url: DATABASE_URL,
    dialect: DIALECT,
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
     url: PRODUCTION_URL,
     dialect: DIALECT
   }
};
