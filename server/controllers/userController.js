const User = require('../models/User');

class UserController {
    static getUsers = (req, res) => {
        try {
            const users = db.getUsers();
            res.json(users)
        } catch(e) {
            res.status(500).json(`Erro ao buscar usuários: ${e}`)
        }
    }

    static createUser = (req, res) => {
        const user = User(req.body);
        try {
            const ret = db.createUser(user);
            if(ret) {
                res.status(200).json(`Usuário ${user} criado!`);
            } else {
                res.status(500).json(`Usuário não criado!`);
            }
        } catch(e) {
            res.status(500).json(`Erro ao criar usuário: ${e}`)
        }
    }

    static updateUser = (req, res) => {
        const {id} = req.params;
        const user = User(req.body);

        try {
            const ret = db.updateUser(id, user)
            if(ret) {
                res.status(202).json(`Usuário ${id} alterado com sucesso!`);
            } else {
                res.status(404).json(`Usuário ${id} não encontrado!`);
            }
        } catch(e) {
            res.status(500).json(`Erro ao alterar usuário: ${e}`);
        }
    }

    static deleteUser = (req, res) => {
        const {id} = req.params;
        try {
            const ret = db.deleteUser(id);
            if(ret) {
                res.status(200).json(`Usuário ${id} deletado com sucesso!`);
            } else {
                res.status(404).json(`Usuário ${id} não encontrado!`);
            }
        } catch(e) {
            res.status(500).json(`Erro ao deletar usuário: ${e}`);
        }
    }
}

module.exports = UserController