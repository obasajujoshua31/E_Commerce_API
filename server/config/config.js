import dotenv from 'dotenv';

dotenv.config();
const { CLIENT_SECRET, DIALECT, DATABASE_URL, PRODUCTION_URL, TEST_URL } = process.env;

export default {
development: {
    url: DATABASE_URL,
    dialect: DIALECT
  },

  test: {
    url: TEST_URL,
    dialect: DIALECT
  },
   appSecret: CLIENT_SECRET,

   production: {
     url: PRODUCTION_URL,
     dialect: DIALECT
   }
};
