const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Vessel = require("./Vessel");

const Arrival = db.define(
  "arrivals",
  {
    id: {
      field: "arrival_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    draft: {
      field: "arrival_draft",
      type: DataTypes.STRING,
      allowNull: false,
    },
    berth: {
      field: "berth_req",
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      field: "date_arrival",
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      field: "time_arrival",
      type: DataTypes.TIME,
      allowNull: false,
    },
    purpose: {
      field: "purpose_call",
      type: DataTypes.STRING,
      allowNull: false,
    },
    discharged: {
      field: "cargoes_discarharged",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    loaded: {
      field: "cargoes_loaded",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Vessel.hasMany(Arrival, {
  foreignKey: "vessels_id",
});

Arrival.belongsTo(Vessel, {
  foreignKey: "vessels_id",
});

module.exports = Arrival;