const sequelize = require('../config/database');
const User = require('../models/User');
const ReadingList = require('../models/ReadingList');
const BookInList = require('../models/BookInList');
const Book = require('../models/Book');

const userIds = [53, 33, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 34, 52, 74, 35, 36, 37, 38, 39, 40, 41];
const listIds = [149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170];
(async () => {
  try {
    console.log('Transaction started.');

    for (let i = 0; i < userIds.length; i++) {
      const listName = "My Booklist";

      // Create a new reading list for the user
      const newList = await ReadingList.create({
        listname: listName,
        user_ID: userIds[i],
      });

      const listID = newList.list_ID; // Get the ID of the created list

      // Generate a random number of books (between 1 and 10)

    }

    // Commit the transaction if everything succeeds
    console.log("All operations completed successfully.");
  } catch (err) {
    // Roll back the transaction on error

    console.error("Transaction rolled back due to error:", err);
  }
})();

/*const numBooks = Math.max(Math.floor(Math.random() * 10), 1);
      const randomBooks = await Book.findAll({
        order: sequelize.random(), // Retrieve random books
        limit: numBooks,
      });

      // Add each random book to the user's reading list
      for (const book of randomBooks) {
        const bookid =book.book_ID;
        await BookInList.create({
          list_ID: listID,
          book_ID: bookid,
        }, );
      }*/