const express = require("express");
const db = require("../config/database");
const router = express.Router();

// Kitapları listele
router.get("/", (req, res) => {
    const query = "SELECT * FROM books"; // Veri tabanındaki tablo adı 'books'
    db.query(query, (err, results) => {
        if (err) {
            console.error("MySQL Query Error:", err.message);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.status(200).json(results);
        }
    });
});

// Yeni kitap ekle
router.post("/", (req, res) => {
    const { title, author } = req.body;
    const query = "INSERT INTO books (title, author) VALUES (?, ?)";
    db.query(query, [title, author], (err, result) => {
        if (err) {
            console.error("MySQL Insert Error:", err.message);
            res.status(500).json({ error: "Failed to insert book" });
        } else {
            res.status(201).json({ message: "Book added successfully", id: result.insertId });
        }
    });
});

module.exports = router;
