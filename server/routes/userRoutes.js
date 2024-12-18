const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/usuarios', UserController.getUsers);
router.post('/usuario', UserController.createUser);
router.put('/usuarios/:id', UserController.updateUser);
router.delete('/usuarios/:id', UserController.deleteUser);
module.exports = router;