const Account = require("../models/Account");

class AccountController {
  static getAccounts = async (req, res) => {
    try {
      const accounts = await Account.findAll();
      res.json(accounts);
    } catch (e) {
      res.status(500).json(`Erro ao buscar contas: ${e}`);
    }
  };

  static getAccountById = async (req, res) => {
    const { id } = req.params;

    try {
      const account = await Account.findOne({
        idAccount: id,
      });
      if (account) res.json(account);
      else res.status(404).json(`Conta não encontrada`);
    } catch (e) {
      res.status(500).json(`Erro ao buscar conta ${id}: ${e}`);
    }
  };

  static createAccount = async (req, res) => {
    try {
      const account = await Account.create({
        idUser: req.body.idUser,
        password: req.body.password,
      });
      res.status(201).json(`Conta ${account.id} criada!`);
    } catch (e) {
      res.status(500).json(`Erro ao criar conta: ${e}`);
    }
  };

  static updateAccountById = async (req, res) => {
    const { id } = req.params;
    try {
      await Account.update(
        {
          idUser: req.body.idUser,
          password: req.body.password,
        },
        {
          where: {
            idAccount: id,
          },
        },
      );
      res.status(202).json(`Conta ${id} alterada com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao alterar conta: ${e}`);
    }
  };

  static deleteAccountById = async (req, res) => {
    const { id } = req.params;
    try {
      await Account.destroy({
        where: {
          idAccount: id,
        },
      });
      res.status(200).json(`Conta ${id} deletada com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  };
}

module.exports = AccountController;
