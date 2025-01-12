const User = require('../models/User'); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating tokens

module.exports = {
    // User registration
    register: async (req, res) => {
        const { username, email, password, bio } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user
            const user = await User.create({
                username,
                email,
                password_hashed: hashedPassword,
                bio: bio || null,
            });

            // Create a default reading list for the new user
            await ReadingList.create({
                listname: 'My Reading List', // Default name for the reading list
                user_ID: user.user_ID,   // Associate the list with the new user
            });

            // Generate JWT token
            const token = jwt.sign({ id: user.user_ID, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

            // Respond with success message
            res.status(201).json({ message: 'User registered successfully.', token });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'User registration failed.', details: error.message });
        }
    },

    // User login (you already have this part correctly set up in your previous code)
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(404).json({ error: 'User not found.' });
            // Compare the plain text password with the hashed one in 'password_hashed'
            const isMatch = await bcrypt.compare(password, user.password_hashed);
            if (!isMatch) return res.status(401).json({ error: 'Invalid crdddddedentials.' });

            // Generate token
            const token = jwt.sign({ id: user.user_ID, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
            res.json({
                message: 'Login successful.',
                token,
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Login failed.', details: error.message });
        }
    }
};

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
}
