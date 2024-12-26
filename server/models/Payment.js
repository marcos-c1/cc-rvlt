const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");
const User = require("./User");

const Payment = sequelize.define(
  "Payment",
  {
    idPayment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("STANDARD", "PRO"),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);


module.exports = Payment;
