const express = require('express');
const router = express.Router();
const BookController = require('../../controllers/bookController');


// Route to get all books
router.get('/all', BookController.getAllBooks);

// Route to get a specific book by ID
router.get('/:id', BookController.getBookById);

router.post('/getAllGenres', BookController.getAllGenres);

// Route to create a new book
router.post('/', BookController.createBook);

// Route to update a specific book by ID
router.put('/:id', BookController.updateBook);

// Route to delete a specific book by ID
router.delete('/:id', BookController.deleteBook);

router.post('/getBookByGenre', BookController.getBookByGenre);

router.post('/getReviewsForBook', BookController.getReviews);
// Add more routes here

module.exports = router;