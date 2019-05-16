import dotenv from 'dotenv';

dotenv.config();
const { PASSWORD, DATABASE, USERNAME, CLIENT_SECRET, HOST, DIALECT } = process.env;

export default {
database: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DIALECT
  },
   appSecret: CLIENT_SECRET
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "mysql"
  // },
  // production: {
  //   username: "root",
  //   password: null,
  //   database: "database_production",
  //   host: "127.0.0.1",
  //   dialect: "mysql"
  // }
};
