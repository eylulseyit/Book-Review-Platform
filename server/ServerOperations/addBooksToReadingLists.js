const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');
const ReadingList = require('../models/ReadingList');
const BookInList = require('../models/BookInList');
const Book = require('../models/Book');

const userIds = [53, 33, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 34, 52, 74, 35, 36, 37, 38, 39, 40, 41];
const listIds = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

(async () => {
  const t = await sequelize.transaction(); // Transaction başlatılıyor

  try {
    console.log('Transaction started.');

    for (let i = 0; i < userIds.length; i++) {
      const listID = listIds[i];

      // listID'nin ReadingList tablosunda mevcut olup olmadığını kontrol et
      const readingListExists = await ReadingList.findByPk(listID, { transaction: t });
      if (!readingListExists) {
        console.error(`Reading list with ID ${listID} does not exist.`);
        continue; // Eğer listID mevcut değilse, bu işlemi atla
      } else {
        console.log(`Reading list with ID ${listID} exists.`);
      }

      const numBooks = Math.max(Math.floor(Math.random() * 10), 1);
      const randomBooks = await Book.findAll({
        order: sequelize.random(),
        limit: numBooks,
        transaction: t, // Transaction parametresi ekleniyor
      });

      // Her bir rastgele kitabı kullanıcının okuma listesine ekle
      for (const book of randomBooks) {
        const bookid = book.book_ID;

        // bookid'nin Book tablosunda mevcut olup olmadığını kontrol et
        const bookExists = await Book.findByPk(bookid, { transaction: t });
        if (!bookExists) {
          console.error(`Book with ID ${bookid} does not exist.`);
          continue; // Eğer bookid geçerli değilse, bu kitabı eklemeyi atla
        } else {
          console.log(`Book with ID ${bookid} exists.`);
        }

        // book_in_list ekleme işlemi
        await BookInList.create({
          list_ID: listID,
          book_ID: bookid,

        }, { transaction: t }); // Transaction parametresi ekleniyor
      }
    }

    await t.commit(); // Transaction başarılıysa commit edilmesi sağlanır
    console.log("All operations completed successfully.");
  } catch (err) {
    await t.rollback(); // Hata durumunda transaction geri alınır
    console.error("Transaction rolled back due to error:", err);
  }
})();
