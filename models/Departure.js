const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Vessel = require("./Vessel");

const Departure = db.define(
  "vessel_departures",
  {
    id: {
      field: "vessel_departures_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      field: "departure_date",
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      field: "departure_time",
      type: DataTypes.TIME,
      allowNull: false,
    },
    portcall: {
      field: "port_of_call",
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Vessel.hasMany(Departure, {
  foreignKey: "vessels_id",
});

Departure.belongsTo(Vessel, {
  foreignKey: "vessels_id",
});

module.exports = Departure;
