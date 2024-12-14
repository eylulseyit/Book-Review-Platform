


const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Anasayfa rotası
router.get('/', (req, res) => {
    res.send('API is working');
});

// Kullanıcılar ile ilgili rotalar
router.post('/users', UserController.createUser);  // Yeni kullanıcı eklemek
router.get('/users', UserController.getAllUsers);  // Tüm kullanıcıları listelemek
router.get('/users/:id', UserController.getUserById);  // Bir kullanıcıyı id ile getirmek
router.put('/users/:id', UserController.updateUser);  // Kullanıcıyı güncellemek
router.delete('/users/:id', UserController.deleteUser);  // Kullanıcıyı silmek

module.exports = router;
