const User = require('../models/User'); // Import the Book model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists based on the email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }


        // Create new user
        const user = await User.create({ 
            username, 
            email, 
            password: password
        });

        // Generate JWT token (using a simple secret key for now)
        const token = jwt.sign({ id: user.id, is_employee: false }, 'your-secret-key', { expiresIn: '1h' });

        // Respond with success message and token
        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
        // Log and return a server error
        console.error('Registration error:', error);
        res.status(500).json({ error: 'User registration failed.', details: error.message });
    }
};

  
  // User login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found.' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });
  
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ message: 'Login successful.', token });
  };

  const getUserById = async (req, res) => {
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
};

const updateUser =async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

const deleteUser = async (req, res) => {
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
};

  module.exports = {login,register,getUserById,updateUser,deleteUser};
