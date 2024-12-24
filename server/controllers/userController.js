const User = require("../models/User");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar usuários: ${e}`);
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: {
          idUser: id,
        },
      });
      if (!user) return res.status(404).json(`Usuário não encontrado`);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar usuário ${id}: ${e}`);
    }
  }

  static async createUser(req, res) {
    try {
      const user = await User.create({
        fullName: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        idCourse: req.body.idCourse ?? null,
        isAdmin: req.body.isAdmin ?? false,
        idPayment: req.body.idPayment ?? null,
      });

      return res.status(201).json(`Usuário ${user.fullname} criado!`);
    } catch (e) {
      return res.status(500).json(`Erro ao criar usuário: ${e}`);
    }
  }

  static async updateUserById(req, res) {
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
      return res.status(202).json(`Usuário ${id} alterado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao alterar usuário: ${e}`);
    }
  }

  static async deleteUserById(req, res) {
    const { id } = req.params;
    try {
      await User.destroy({
        where: {
          idUser: id,
        },
      });
      return res.status(200).json(`Usuário ${id} deletado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  }
}

module.exports = UserController;
