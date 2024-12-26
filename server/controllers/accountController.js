const Account = require("../models/Account");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AccountController {
  static async getAccounts(req, res) {
    try {
      const idUser = req.idUser;
      // Only possible to see all accounts if the user is admin
      const user = await User.findOne({
        where: {
          idUser: idUser,
          isAdmin: true,
        },
      });
      if (!user) {
        return res.status(401).json(`Acesso negado`);
      }

      const accounts = await Account.findAll();
      return res.status(200).json(accounts);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar contas: ${e}`);
    }
  }

  static async getAccountById(req, res) {
    const { id } = req.params;
    const idUserFromMid = req.idUser;

    try {
      const account = await Account.findOne({
        where: {
          idAccount: id,
          idUser: idUserFromMid,
        },
      });
      if (!account) {
        return res.status(404).json(`Conta não encontrada`);
      }
      return res.status(200).json(account);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar conta ${id}: ${e}`);
    }
  }

  static async loginToAccount(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      console.log(user);
      
      if (!user) {
        return res.status(401).json(`Acesso negado. E-mail ou senha errados`);
      }

      const account = await Account.findOne({
        where: {
          idUser: user.idUser,
        },
      });

      if (!account) {
        return res.status(401).json(`Acesso negado. E-mail ou senha errados`);
      }

      const match = account.validPwd(password);

      if (!match) {
        return res.status(401).json(`Acesso negado. E-mail ou senha errados`);
      }
      const payload = {
        idUser: user.idUser,
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
      return res.status(500).json(`Erro ao autenticar conta: ${e}`);
    }
  }

  static async createAccount(req, res) {
    try {
      const account = await Account.create({
        idUser: req.body.idUser,
        password: req.body.password,
      });
      return res.status(201).json(`Conta criada!`);
    } catch (e) {
      return res.status(500).json(`Erro ao criar conta: ${e}`);
    }
  }

  static async updateAccountById(req, res) {
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
      return res.status(202).json(`Conta ${id} alterada com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao alterar conta: ${e}`);
    }
  }

  static async deleteAccountById(req, res) {
    const { id } = req.params;
    try {
      await Account.destroy({
        where: {
          idAccount: id,
        },
      });
      return res.status(200).json(`Conta ${id} deletada com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  }
}

module.exports = AccountController;
