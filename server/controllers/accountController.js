const Account = require("../models/Account");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

  static loginToAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      const account = await Account.findOne({
        where: {
          idUser: user.idUser,
        },
      });

      if (!user || !account) {
        return res.status(401).json(`Acesso negado. E-mail ou senha errados`);
      }

      const match = account.validPwd(password);

      if (!match) {
        return res.status(401).json(`Acesso negado. E-mail ou senha errados`);
      }
      const payload = {
        idUser: user.idUser,
        isAdmin: user.isAdmin,
        email: user.email,
        idPayment: user.idPayment,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(`Logado.`);
    } catch (e) {
      res.status(500).json(`Erro ao autenticar conta: ${e}`);
    }
  };

  static createAccount = async (req, res) => {
    try {
      const account = await Account.create({
        idUser: req.body.idUser,
        password: req.body.password,
      });
      res.status(201).json(`Conta criada!`);
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
