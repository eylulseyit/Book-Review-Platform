// src/pages/BookList.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';  // API'den kitapları çeken fonksiyon
import BookCard from '../components/BookCard';  // Kitap kartlarını gösteren bileşen

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();  // API'den kitapları çekiyoruz
                setBooks(fetchedBooks);  // Verileri state'e kaydediyoruz
            } catch (err) {
                setError('Kitaplar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);  // Yüklenme tamamlandı
            }
        };
        getBooks();
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="book-list">
            <h1>Book List</h1>
            {books.length === 0 ? (
                <p>No books have been added yet.</p>
            ) : (
                books.map((book) => (
                    <BookCard key={book.book_ID} book={book} />
                ))
            )}
        </div>
    );
};

export default BookList;
