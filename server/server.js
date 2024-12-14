const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/api/bookRoutes'); // Routes dosyasını import et
const sequelize = require('./config/database'); // Sequelize bağlantısını import et
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API rotalarını bağlama
app.use('/api', bookRoutes);

// Veritabanı senkronizasyonu
sequelize.sync()
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
