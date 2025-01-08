const User = require('../models/User'); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating tokens
const ReadingList = require('../models/ReadingList');
const Book = require('../models/Book');
const BookInList = require('../models/BookInList');


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
        
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    getUserProfile: async (req, res) => {
        const { id } = req.body.token;
        
        try {

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, email, password } = req.body;
        console.log("uodateUser works");
        try {
            const user = await User.findByPk(id);
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
        const { id } = req.params;
        const { bio } = req.body;
        try {
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
        const { id } = req.params;
        try {
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
        try {
            const userId = req.params.userId; // Assuming userId is passed as URL parameter
            const user = await User.findByPk(userId, {
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
        try {
            const { listname } = req.body;
            const userId = req.params.id;

            const newList = await ReadingList.create({
                listname: listname,
                user_ID: userId
            });

            res.status(201).json(newList);
        } catch (error) {
            res.status(500).json({ message: 'Error creating reading list', error });
        }
    },

    getReadingList: async (req, res) => {
        try {
            const userId = req.params.userId;
            const listId = req.params.listId;

            const readingList = await ReadingList.findOne({
                where: { list_ID: listId, user_ID: userId },
                include: {
                    model: Book,
                    through: BookInList
                }
            });

            if (!readingList) {
                return res.status(404).json({ message: 'Reading list not found' });
            }

            res.status(200).json(readingList);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reading list', error });
        }
    },

    // Function to add a book to a user's reading list
    addBookToReadingList: async (req, res) => {
        try {
            const { list_ID, book_ID, progress } = req.body;

            // Ensure the reading list and book exist
            const readingList = await ReadingList.findByPk(list_ID);
            const book = await Book.findByPk(book_ID);

            if (!readingList || !book) {
                return res.status(404).json({ message: 'Reading list or book not found' });
            }

            const newBookInList = await BookInList.create({
                list_ID,
                book_ID,
                progress
            });

            res.status(201).json(newBookInList);
        } catch (error) {
            res.status(500).json({ message: 'Error adding book to list', error });
        }
    },

    // Function to update the progress of a book in a user's list
    updateBookProgress: async (req, res) => {
        try {
            const { list_ID, book_ID } = req.params;
            const { progress } = req.body;

            // Find the specific book entry in BookInList
            const bookInList = await BookInList.findOne({
                where: { list_ID, book_ID }
            });

            if (!bookInList) {
                return res.status(404).json({ message: 'Book not found in list' });
            }

            bookInList.progress = progress;
            await bookInList.save();

            res.status(200).json(bookInList);
        } catch (error) {
            res.status(500).json({ message: 'Error updating book progress', error });
        }
    }
};

