// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api'; // Kitapları API'den çeken fonksiyon
import { useNavigate } from 'react-router-dom'; // Kitap detayına yönlendirme için

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks);
            } catch (err) {
                setError('Kitaplar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
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
        <div>
            <h1>Hoşgeldiniz!</h1>
            <p>Kitap okuma platformuna hoş geldiniz. Kitaplarınızı burada keşfedin.</p>

            <div className="book-list">
                {books.length === 0 ? (
                    <p>Henüz kitap eklenmemiş.</p>
                ) : (
                    books.map((book) => (
                        <div
                            key={book.book_ID}
                            className="book-card"
                            onClick={() => navigate(`/books/${book.book_ID}`)}
                        >
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.description.slice(0, 100)}...</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
