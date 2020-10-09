const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Vessel = require("./Vessel");

const Booking = db.define(
  "bookings",
  {
    id: {
      field: "booking_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      field: "book_date",
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      field: "book_time",
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Vessel.hasMany(Booking, {
  foreignKey: "vessels_id",
});

Booking.belongsTo(Vessel, {
  foreignKey: "vessels_id",
});

module.exports = Booking;
