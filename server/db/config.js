require("dotenv").config();
const sqlite = require("sqlite3");
const { Sequelize, DataTypes } = require("sequelize");

class Database extends Sequelize {
  constructor() {
    super("sqlite::memory::", {
      dialect: "sqlite",
      storage: "../storage/db.sqlite",
    });
    this.auth();
    this.drop({force: true});
    this.sync({force: true});
  }

  async auth() {
    try {
      await this.authenticate();
      console.log("Conexão com o SQLite estabelecida com sucesso.");
    } catch (error) {
      console.error("Erro ao estabelecer conexão com o SQLite: ", error);
    }
  }
}

const sequelize = new Database();

module.exports = sequelize;
