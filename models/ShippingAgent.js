const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Vessel = require("./Vessel");

const Agent = db.define("shipping_agent", {
  id: {
    field: "shipping_agent_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  e_add: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_agent_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Agent.hasMany(Vessel, {
  foreignKey: "shipping_agent_id",
});

Vessel.belongsTo(Agent, {
  foreignKey: "shipping_agent_id",
});

module.exports = Agent;
