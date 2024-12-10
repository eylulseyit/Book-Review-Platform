const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');  // Veritabanı bağlantısı
const user = require('./models/User');  // Örnek model
const book = require('./models/Book');  // Kitap modeli (örnek)
//const book_in_list = require('./models/Book_in_list');  // İnceleme modeli (örnek)
//const comment = require('./models/Comment');
//const reading_list = require('./models/reading_list');
//const review = require('./models/Review');



// Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Eğer başka bir origin'den bağlantı yapılacaksa kullanılır

// API Routes (örnek)
//const userRouter = require('./routes/userRoutes');  // User route'ları (kendi routes dosyanızı oluşturun)
//const bookRouter = require('./routes/bookRoutes');  // Book route'ları (kendi routes dosyanızı oluşturun)

//app.use('/api/users', userRouter);  // User API routes
//app.use('/api/books', bookRouter);  // Book API routes


// Veritabanı bağlantısını kontrol et
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı başarıyla bağlandı!');
  })
  .catch(err => {
    console.error('Veritabanı bağlantı hatası:', err);
  });

// Veritabanı senkronizasyonu (force: false, mevcut tablolara dokunmadan senkronize eder)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Veritabanı senkronize edildi!');
  })
  .catch(err => {
    console.error('Veritabanı senkronizasyon hatası:', err);
  });

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
