const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const BasicInfo = require("./BasicInfo");

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

BasicInfo.hasMany(Departure, {
  foreignKey: "basic_info_id",
});

Departure.belongsTo(BasicInfo, {
  foreignKey: "basic_info_id",
});

module.exports = Departure;
