const { Sequelize } = require('sequelize');

// Veritabanı bağlantısını tanımlama
const sequelize = new Sequelize('book_site', 'root', 'root', {
    host: 'localhost',  // Eğer MySQL yerel makinede çalışıyorsa 'localhost' olmalı
    dialect: 'mysql',   // Kullanılan veritabanı türü
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
