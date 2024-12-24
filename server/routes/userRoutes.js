const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/usuarios", UserController.getUsers);
router.get("/usuario/:id", UserController.getUserById);
router.post("/usuario", UserController.createUser);
router.put("/usuario/:id", UserController.updateUserById);
router.delete("/usuarios/:id", UserController.deleteUserById);

module.exports = router;
