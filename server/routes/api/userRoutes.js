const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');


// Route to get all books
//router.get('/', userController.);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserProfile);
router.put('/:id', UserController.updateUser);
router.put('/user/:id/update-bio', UserController.updateBio);
router.delete('/:id', UserController.deleteUser);
/*
router.get('/books', userController.getUserBooks);      // Kullanıcıya ait kitaplar
router.post('/add-book', userController.addBookToProfile); // Kitap ekleme işlemi*/

module.exports = router;
