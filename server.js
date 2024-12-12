// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book_site'
});

db.connect(err => {
  if (err) {
    console.error('Veritabanı bağlantı hatası: ', err);
  } else {
    console.log('Veritabanına bağlanıldı.');
  }
});

// Kullanıcıları ve kitapları listeleme API'ları
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Kitaplar yüklenemedi.' });
    } else {
      res.json(results);
    }
  });
});

// Kullanıcı profilini getirme API'si
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Kullanıcı bilgileri yüklenemedi.' });
    } else {
      res.json(results[0]);
    }
  });
});

// Kitap ekleme API'si
app.post('/api/books', (req, res) => {
  const { title, author, description } = req.body;
  db.query(
    'INSERT INTO books (title, author, description) VALUES (?, ?, ?)',
    [title, author, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Kitap eklenemedi.' });
      } else {
        res.status(201).json({ message: 'Kitap başarıyla eklendi.' });
      }
    }
  );
});

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
