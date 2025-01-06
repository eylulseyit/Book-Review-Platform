const User = require('../models/User');
const sequelize = require('../config/database');  // Import the sequelize instance from the correct config


const deleteAllUsers = async () => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();
    
    // If no users are found, log a message and stop
    if (users.length === 0) {
      console.log('No users found to delete.');
      return;
    }

    // Iterate over the users and delete each one
    for (const user of users) {
      await user.destroy();
      console.log(`User ${user.username} deleted successfully.`);
    }

  } catch (error) {
    // Log any errors encountered during the deletion process
    console.error('Error deleting users:', error.message);
  }
};

// Call the function to delete all users
deleteAllUsers();

