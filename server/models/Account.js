const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/config");
const bcrypt = require("bcrypt");

class Account extends Model {
  validPwd = (pwd) => {
    return bcrypt.compareSync(pwd, this.password);
  };
  hashPwd = (user) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  };
}

Account.init(
  {
    idAccount: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      beforeBulkUpdate: (user) => {
        console.log(user);
        const salt = bcrypt.genSaltSync();
        user.attributes.password = bcrypt.hashSync(
          user.attributes.password,
          salt,
        );
      },
    },
    sequelize,
  },
);

module.exports = Account;
