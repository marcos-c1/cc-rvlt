const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");
const bcrypt = require("bcrypt");
const User = require("./User");

const Account = sequelize.define(
  "Account",
  {
    idAccount: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // The login is the email himself
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    instanceMethods: {
      validPwd: (pwd) => {
        return bcrypt.compareSync(pwd, this.password);
      },
    },
  },
);

User.hasOne(Account, { as: "Account", foreignKey: "idAccount" });
Account.belongsTo(User, { as: "User", foreignKey: "idUser" });

module.exports = Account;
