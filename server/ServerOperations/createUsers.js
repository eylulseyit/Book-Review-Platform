const User = require('../models/User');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const sequelize = require('../config/database');  // Import the sequelize instance from the correct config


const users = [
  { username: 'user1', email: 'user1@example.com', password: 'password1', bio: 'Bio for user1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2', bio: 'Bio for user2' },
  { username: 'user3', email: 'user3@example.com', password: 'password3', bio: 'Bio for user3' },
  { username: 'user4', email: 'user4@example.com', password: 'password4', bio: 'Bio for user4' },
  { username: 'user5', email: 'user5@example.com', password: 'password5', bio: 'Bio for user5' },
  { username: 'user6', email: 'user6@example.com', password: 'password6', bio: 'Bio for user6' },
  { username: 'user7', email: 'user7@example.com', password: 'password7', bio: 'Bio for user7' },
  { username: 'user8', email: 'user8@example.com', password: 'password8', bio: 'Bio for user8' },
  { username: 'user9', email: 'user9@example.com', password: 'password9', bio: 'Bio for user9' },
  { username: 'user10', email: 'user10@example.com', password: 'password10', bio: 'Bio for user10' },
  { username: 'user11', email: 'user11@example.com', password: 'password11', bio: 'Bio for user11' },
  { username: 'user12', email: 'user12@example.com', password: 'password12', bio: 'Bio for user12' },
  { username: 'user13', email: 'user13@example.com', password: 'password13', bio: 'Bio for user13' },
  { username: 'user14', email: 'user14@example.com', password: 'password14', bio: 'Bio for user14' },
  { username: 'user15', email: 'user15@example.com', password: 'password15', bio: 'Bio for user15' },
  { username: 'user16', email: 'user16@example.com', password: 'password16', bio: 'Bio for user16' },
  { username: 'user17', email: 'user17@example.com', password: 'password17', bio: 'Bio for user17' },
  { username: 'user18', email: 'user18@example.com', password: 'password18', bio: 'Bio for user18' },
  { username: 'user19', email: 'user19@example.com', password: 'password19', bio: 'Bio for user19' },
  { username: 'user20', email: 'user20@example.com', password: 'password20', bio: 'Bio for user20' }
];

const createUsers = async () => {
  for (const user of users) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create the user in the database
      await User.create({
        username: user.username,
        email: user.email,
        password_hashed: hashedPassword,
        bio: user.bio
      });

      console.log(`User ${user.username} created successfully.`);
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error.message);
    }
  }
};

// Run the function to create the users
createUsers();
