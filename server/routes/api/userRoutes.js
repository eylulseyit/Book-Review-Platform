const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');


// Route to get all books
//router.get('/', userController.);
//ALL THE ID'S IN FIRST PART ARE USER ID'S
router.get('/', UserController.getAllUsers);//GET ALL USERS

router.get('/getUserProfile', UserController.getUserProfile);//GET USER PROFILE

router.put('/:id', UserController.updateUser);//UPDATE USER (username, email, password, send all of them as json

router.put('/:id/update-bio', UserController.updateBio);

router.delete('/:id', UserController.deleteUser);

router.post('/:id/create-booklist', UserController.createReadingListForUser);

router.get('/:id/booklists', UserController.getUserReadingLists);

router.get('/:id/booklist/:list_id', UserController.getReadingList);

/*
router.get('/books', userController.getUserBooks);      // Kullanıcıya ait kitaplar
router.post('/add-book', userController.addBookToProfile); // Kitap ekleme işlemi*/

module.exports = router;