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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nrt: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dwt: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    loa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    breadth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name_last_port: {
      type: DataTypes.STRING,
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
