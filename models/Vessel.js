const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const ShippingAgent = require("./ShippingAgent");

const Vessel = db.define(
  "vessels",
  {
    vessels_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vessel_flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imonumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GRT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DWT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NRT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LOA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breadth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Vessel;
