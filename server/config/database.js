//direct communication with database

const { Sequelize } = require('sequelize');

// This is about identify your database, write it personally for your local host datas
//I write it for my mysql database

/* Special note: I learned that our old database name 'book-site' occurs some problems. The char '-' is problematic.
A lot of problems solved when i changed my database name from mysql workbench to 'book_site' from 'book-site' */
// const sequelize = new Sequelize('book_site', 'root', 'Eylul3131.', {//third variable is the database password
//     host: '127.0.0.1',  // You can make this localhost
//     dialect: 'mysql',   // database type
// });



const sequelize = new Sequelize('book_site', 'root', 'root', {
    host: 'localhost',  // You can make this localhost
    dialect: 'mysql',   // database type
});



// Veritabanına bağlanıp bağlanamadığını kontrol etme
sequelize.authenticate()
    .then(() => {
        console.log('Veritabanına başarılı bir şekilde bağlanıldı!');
    })
    .catch((error) => {
        console.error('Veritabanına bağlanırken bir hata oluştu:', error);
    });
module.exports = sequelize;
