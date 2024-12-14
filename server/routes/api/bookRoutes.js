const express = require('express');
const router = express.Router();
const BookController = require('../../controllers/api/BookController');

// Kitaplarla ilgili API rotaları
router.post('/', BookController.addBook);  // Kitap ekleme
router.get('/', BookController.getAllBooks);  // Tüm kitapları listeleme
router.get('/:id', BookController.getBookById);  // Kitap bilgisi alma

module.exports = router;
