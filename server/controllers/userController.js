const User = require('../models/User'); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating tokens

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
        const { id } = req.params;
        
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
            user.bio = bio || user.bio;
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
    }
};

