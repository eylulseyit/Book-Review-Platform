const Book = require('../models/Book'); // Import the Book model
//and there, all functions about books or requires book data
module.exports = {
    // Fetch all books
    getAllBooks: async (req,res) => {
        try {
            const book = await Book.findAll(); // Sequelize function to get all records
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error });
        }
    },

    // Fetch a specific book by ID
    getBookById: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id); // Sequelize function to find by primary key
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error });
        }
    },

    // Create a new book
    createBook: async (req, res) => {
        const { title, author, genre, isbn, description } = req.body;
        try {
            const newBook = await Book.create({
                title,
                author,
                genre,
                isbn,
                description
            });
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: 'Error creating book', error });
        }
    },
    

    // Update a book
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author, genre, isbn, description } = req.body;
        try {
            const book = await Book.findOne({ where: { book_ID: id } });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            book.title = title || book.title;
            book.author = author || book.author;
            book.genre = genre || book.genre;
            book.isbn = isbn || book.isbn;
            book.description = description || book.description;
            await book.save();
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error updating book', error });
        }
    },

    // Delete a book
    deleteBook: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            await book.destroy(); // Remove the record from the database
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book', error });
        }
    },

    getBookByCategory: async (req, res) => {
        
        const { category } = req.body;

        if(!category){  // Check if category is not provided
            return res.status(400).json({ message: 'Category is required' });
        }
        
        try {
            const book = await Book.findAll({ where: { genre: category } });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const book = await Book.findAll({ attributes: ['genre'] });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error });
        }
    }
};
