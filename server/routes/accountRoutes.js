const express = require("express");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const AccountController = require("../controllers/accountController");

router.get("/contas", AccountController.getAccounts);
router.get(
  "/conta/:id",
  AuthMiddleware.verifyToken,
  AccountController.getAccountById,
);
router.post("/registrarConta", AccountController.createAccount);
router.post("/login", AccountController.loginToAccount);
router.put("/conta/:id", AccountController.updateAccountById);
router.delete("/contas/:id", AccountController.deleteAccountById);

module.exports = router;
