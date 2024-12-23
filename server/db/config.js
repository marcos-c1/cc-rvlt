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
  }

  async auth() {
    try {
      await this.authenticate();
      console.log("Conexão com o SQLite estabelecida com sucesso.");
    } catch (error) {
      console.error("Erro ao estabelecer conexão com o SQLite: ", error);
    }
  }

  async close() {
    await this.close();
  }
}

const sequelize = new Database();

module.exports = sequelize;
