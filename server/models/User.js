const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");

const User = sequelize.define(
  "User",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idCourse: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {},
);

module.exports = User;
