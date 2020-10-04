const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Useraccount = db.define(
  "useraccount",
  {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Useraccount;
