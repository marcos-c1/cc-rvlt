const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/config");
const Payment = require("./Payment");
const Account = require("./Account");

const User = sequelize.define(
  "User",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPayment: {
      type: DataTypes.INTEGER,
      references: {
        model: Payment,
        key: "idPayment",
      },
    },
    idAccount: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
        key: "idAccount",
      },
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
    }
  },
  {
    timestamps: true,
  },
);

User.hasMany(Payment, { targetKey: "idUser", foreignKey: "idUser", onDelete: 'CASCADE'});
Payment.hasOne(User, { targetKey: "idPayment", foreignKey: "idPayment", onDelete: 'RESTRICT'});

User.hasOne(Account, { targetKey: "idUser", foreignKey: "idUser", onDelete: 'CASCADE' });
Account.hasOne(User, { targetKey: "idAccount", foreignKey: "idAccount" });

module.exports = User;
