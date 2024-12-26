const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');


// Route to get all books
//router.get('/', userController.);

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
// Add more routes here

module.exports = router;