const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

router.get('/', UserController.getAllUsers);//GET ALL USERS

router.post('/getUserProfile', UserController.getUserProfile);//GET USER PROFILE

router.put('/update-user', UserController.updateUser);//UPDATE USER (username, email, password, send all of them as json

router.put('/update-bio', UserController.updateBio);

router.delete('/delete-user', UserController.deleteUser);

router.post('/booklist', UserController.getReadingListBooks);

router.post('/addBookToList', UserController.addBookToReadingList);

router.delete('/deleteBookFromList', UserController.deleteBookFromReadingList);

router.post('/addReview', UserController.addReview);

router.post('/addComment', UserController.addComment);

router.post('/addBookAndReview', UserController.addBookAndReview); 

router.post('/checkToken', UserController.checkTokenValidation);

/*
router.get('/books', userController.getUserBooks);      // Kullanıcıya ait kitaplar
router.post('/add-book', userController.addBookToProfile); // Kitap ekleme işlemi*/



//router.post('/create-booklist', UserController.createReadingListForUser);

//router.get('/booklists', UserController.getUserReadingLists);

module.exports = router;