const Sequelize = require('sequelize');
const dbConfig = require("./db.config");
require("dotenv").config();
console.log(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,dbConfig.HOST)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = sequelize;
