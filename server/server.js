//this is the file that ups the entire program

const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import index.js, because we access all the routes from there
const sequelize = require('./config/database'); // Sequelize bağlantısını import et

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API rotalarını bağlama
app.use('/api', routes);

// Veritabanı senkronizasyonu
sequelize.sync({ force: false })
  .then(() => {
    console.log('Veritabanı başarıyla senkronize edildi.');
  })
  .catch((error) => {
    console.error('Veritabanı senkronizasyon hatası:', error);
  });

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
