const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const BasicInfo = require("./BasicInfo");

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

BasicInfo.hasMany(Booking, {
  foreignKey: "basic_info_id",
});

Booking.belongsTo(BasicInfo, {
  foreignKey: "basic_info_id",
});

module.exports = Booking;
