const User = require("../models/User");

class UserController {
  static getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      res.status(500).json(`Erro ao buscar usuários: ${e}`);
    }
  };

  static getUserById = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: {
          idUser: id,
        },
      });
      if (user) res.json(user);
      else res.status(404).json(`Usuário não encontrado`);
    } catch (e) {
      res.status(500).json(`Erro ao buscar usuário ${id}: ${e}`);
    }
  };

  static createUser = async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.create({
        fullName: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        idCourse: req.body.idCourse ?? null,
        isAdmin: req.body.isAdmin ?? false,
        idPayment: req.body.idPayment ?? null,
      });

      res.status(201).json(`Usuário ${user.fullname} criado!`);
    } catch (e) {
      res.status(500).json(`Erro ao criar usuário: ${e}`);
    }
  };

  static updateUserById = async (req, res) => {
    const { id } = req.params;
    try {
      await User.update(
        {
          fullName: req.body.fullname,
          email: req.body.email,
          phone: req.body.phone,
          idCourse: req.body.idCourse ?? null,
          isAdmin: req.body.isAdmin ?? false,
          idPayment: req.body.idPayment ?? null,
        },
        {
          where: {
            idUser: id,
          },
        },
      );
      res.status(202).json(`Usuário ${id} alterado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao alterar usuário: ${e}`);
    }
  };

  static deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      await User.destroy({
        where: {
          idUser: id,
        },
      });
      res.status(200).json(`Usuário ${id} deletado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  };
}

module.exports = UserController;
