// server.js
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // JSON verisini alabilmek için
app.use(cors()); // CORS hatalarını engellemek için

// MySQL bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book_site' // Veritabanı adı
});

// Veritabanı bağlantısı
db.connect(err => {
    if (err) {
        console.error('Veritabanı bağlantı hatası: ', err);
        process.exit(1); // Bağlantı hatası varsa uygulamayı sonlandır
    } else {
        console.log('Veritabanına bağlanıldı.');
    }
});

// Kitapları listeleme API'si
app.get('/api/book', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Kitaplar yüklenemedi:', err);
            res.status(500).json({ error: 'Kitaplar yüklenemedi.' });
        } else {
            res.json(results); // Kitapları JSON formatında döndür
        }
    });
});

// Kullanıcı profilini getirme API'si
app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Kullanıcı bilgileri yüklenemedi:', err);
            res.status(500).json({ error: 'Kullanıcı bilgileri yüklenemedi.' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        } else {
            res.json(results[0]); // Kullanıcıyı JSON formatında döndür
        }
    });
});

// Kitap ekleme API'si
app.post('/api/book', (req, res) => {
    const { title, author, description } = req.body;

    // Verinin doğruluğunu kontrol et
    if (!title || !author || !description) {
        return res.status(400).json({ error: 'Başlık, yazar ve açıklama gereklidir.' });
    }

    // Kitap ekleme işlemi
    db.query(
        'INSERT INTO books (title, author, description) VALUES (?, ?, ?)',
        [title, author, description],
        (err, results) => {
            if (err) {
                console.error('Kitap eklenemedi:', err);
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
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
