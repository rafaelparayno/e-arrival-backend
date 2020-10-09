const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Vessel = require("./Vessel");

const Crew = db.define(
  "crews",
  {
    id: {
      field: "crew_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      field: "c_fn",
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      field: "c_mn",
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      field: "c_ln",
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Vessel.hasMany(Crew, {
  foreignKey: "vessels_id",
});

Crew.belongsTo(Vessel, {
  foreignKey: "vessels_id",
});

module.exports = Crew;
