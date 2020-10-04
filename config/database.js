require("dotenv").config();

const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  "",
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);
