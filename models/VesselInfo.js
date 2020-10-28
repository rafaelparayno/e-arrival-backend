const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const BasicInfo = require("./BasicInfo");

const VesselInfo = db.define(
  "vessel_infos",
  {
    vessel_info_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "vessel_name",
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
    },
    flag_registry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voyage_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nrt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dwt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breadth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_last_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departure_last_port: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

BasicInfo.hasMany(VesselInfo, {
  foreignKey: "basic_info_id",
});

VesselInfo.belongsTo(BasicInfo, {
  foreignKey: "basic_info_id",
});

module.exports = VesselInfo;
