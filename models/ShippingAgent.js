const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Agent = db.define("shipping_agent", {
  shipping_agent_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  e_add: {
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

module.exports = Agent;
module.exports = Useraccount;
