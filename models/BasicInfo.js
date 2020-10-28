const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const BasicInfo = db.define(
  "basic_info",
  {
    id: {
      field: "basic_info_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shipping_license_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quaratine_facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quaratine_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quaratine_cno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_agency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crew_service_boat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_plate_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driver_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driver_cno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e_add: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = BasicInfo;
