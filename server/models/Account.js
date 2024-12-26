const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/config");
const bcrypt = require("bcrypt");
const User = require("./User");

class Account extends Model {
  validPwd = (pwd) => {
    return bcrypt.compareSync(pwd, this.password);
  };
  hashPwd = (user) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  }
}

Account.init(
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
      beforeCreate: (user) => user.hashPwd(user),
      beforeSave: (user) => user.hashPwd(user)
    },
    sequelize,
  },
);

module.exports = Account;
