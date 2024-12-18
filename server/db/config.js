require('dotenv').config();
const sqlite = require('sqlite3');
const {Sequelize, DataTypes } = require('sequelize');

class Sequelizer {
    constructor() {
        this.sequelize = new Sequelize('sqlite::memory::', {
            dialect: 'sqlite',
            storage: '../storage/db.sqlite'
        });
    }

    async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Conexão com o SQLite estabelecida com sucesso.');
        } catch (error) {
            console.error('Erro ao estabelecer conexão com o SQLite: ', error);
        }
    }

    async close() {
        await this.sequelize.close();
    }
}


module.exports = Sequelizer;