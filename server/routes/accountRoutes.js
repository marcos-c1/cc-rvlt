const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/accountController");

router.get("/contas", AccountController.getAccounts);
router.get("/conta/:id", AccountController.getAccountById);
router.post("/conta", AccountController.createAccount);
router.put("/conta/:id", AccountController.updateAccountById);
router.delete("/contas/:id", AccountController.deleteAccountById);

module.exports = router;
