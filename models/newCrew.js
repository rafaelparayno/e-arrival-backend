const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const BasicInfo = require("./BasicInfo");

const NewCrew = db.define(
  "new_crews",
  {
    id: {
      field: "new_crews_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_master: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_fil_crews: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_for_crews: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    names_fil_singin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    names_for_singin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    names_fil_singoff: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    names_for_singoff: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

BasicInfo.hasMany(NewCrew, {
  foreignKey: "basic_info_id",
});

NewCrew.belongsTo(BasicInfo, {
  foreignKey: "basic_info_id",
});

module.exports = NewCrew;
