const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");
const Payment = require("./Payment");

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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "Check if the current user is an admin of the page",
    },
    idPayment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "The latest payment that the current user did",
      references: {
        model: Payment,
        key: "idPayment",
      },
    },
  },
  {
    timestamps: true,
  },
);

User.hasOne(Payment, { as: "Payment", foreignKey: "idPayment" });
Payment.belongsTo(User, { as: "User", foreignKey: "idUser" });

module.exports = User;
