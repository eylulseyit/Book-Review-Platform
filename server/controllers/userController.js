const User = require('../models/User'); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating tokens
const ReadingList = require('../models/ReadingList');
const Book = require('../models/Book');
const BookInList = require('../models/BookInList');
const Comment = require('../models/Comment');
const Review = require('../models/Review');


module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll(); // Sequelize function to get all records
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },

    getUserProfile: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        //ADD A FUNCTION FOR IF THERE IS NO BOOKLIST FOR USER, CREATE ONE

        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const user = await User.findByPk(decoded.id);
            console.log(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    updateUser: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        const { username, email, password} = req.body;

        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.username = username || user.username;
            user.email = email || user.email;
            if (password) {
                user.password_hashed = await bcrypt.hash(password, 10); // Assuming password_hashed is correct
            }
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    },

    updateBio: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        const { bio } = req.body;
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const id = decoded.id;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.bio = bio !== undefined ? bio : user.bio;

            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating bio', error });
        }
    },

    deleteUser: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const id = decoded.id;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },

    getUserReadingLists: async (req, res) => {
        
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const id = decoded.id;
            const user = await User.findByPk(id,{
                include: {
                    model: ReadingList,
                    include: Book // Include books for each list
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user.ReadingLists);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user reading lists', error });
        }
    },

    // Function to create a new reading list for a user
    createReadingListForUser: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        try {
            const { listname } = req.body;
            const decoded = jwt.verify(token, 'your-secret-key');
            const id = decoded.id;

            const newList = await ReadingList.create({
                listname: listname,
                user_ID: id
            });

            res.status(201).json(newList);
        } catch (error) {
            res.status(500).json({ message: 'Error creating reading list', error });
        }
    },

    getReadingList: async (req, res) => {
        try {
            // Extract and validate token
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token missing' });
            }

            const decoded = jwt.verify(token, 'your-secret-key');
            const userId = decoded.id;

            // Validate that listId is a number
            const listId = parseInt(req.params.listId, 10);
            if (isNaN(listId)) {
                return res.status(400).json({ message: 'Invalid list ID' });
            }

            // Retrieve the reading list and include associated books through BookInList
            const readingList = await ReadingList.findOne({
                where: { list_ID: listId, user_ID: userId },
                include: [
                    {
                        model: BookInList,
                        include: {
                            model: Book,
                            attributes: ['book_ID', 'title', 'author', 'genre', 'isbn', 'description'],
                        },
                    },
                ],
            });

            // Check if the reading list exists
            if (!readingList) {
                return res.status(404).json({ message: 'Reading list not found' });
            }

            // Respond with the reading list and associated books
            res.status(200).json(readingList);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            res.status(500).json({ message: 'Error fetching reading list', error: error.message });
        }
    },
    

    // Function to add a book to a user's reading list
    addBookToReadingList: async (req, res) => {
        try {
            const { list_ID, book_ID } = req.body;

            // Ensure the reading list and book exist
            const readingList = await ReadingList.findByPk(list_ID);
            const book = await Book.findByPk(book_ID);

            if (!readingList || !book) {
                return res.status(404).json({ message: 'Reading list or book not found' });
            }

            const newBookInList = await BookInList.create({
                list_ID,
                book_ID,
            });

            res.status(201).json(newBookInList);
        } catch (error) {
            res.status(500).json({ message: 'Error adding book to list', error });
        }
    },

    deleteBookFromReadingList: async (req, res) => {
        try {
            const { list_ID, book_ID } = req.body;

            // Ensure the reading list and book exist
            const readingList = await ReadingList.findByPk(list_ID);
            const book = await Book.findByPk(book_ID);

            if (!readingList || !book) {
                return res.status(404).json({ message: 'Reading list or book not found' });
            }

            const bookInList = await BookInList.findOne({
                where: {
                    list_ID,
                    book_ID,
                },
            });

            if (!bookInList) {
                return res.status(404).json({ message: 'Book not found in list' });
            }

            await bookInList.destroy();
            res.status(200).json({ message: 'Book removed from list' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book from list', error });
        }
    },

    addReview: async (req, res) => {
        try {
            const { rating, review_text, book_ID } = req.body;

            // Ensure the book exists
            const book = await Book.findByPk(book_ID);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const newReview = await Review.create({
                rating,
                review_text,
                book_ID,
                user_ID,
            });

            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ message: 'Error adding review', error });
        }
    },

    Comment: async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token missing' });
            }

            const decoded = jwt.verify(token, 'your-secret-key');
            const userId = decoded.id;
            const { comment_text, review_ID } = req.body;

            // Ensure the review exists
            const review = await Review.findByPk(review_ID);

            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            const newComment = await Comment.create({
                comment_text: comment_text,
                review_ID: review_ID,
                user_ID: userId,
            });

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: 'Error adding comment', error });
        }

    }

};

