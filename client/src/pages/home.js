// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/bookCards';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="home">
            <h1>Kitaplar</h1>
            <div className="book-list">
                {books.length > 0 ? (
                    books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p>Kitaplar yükleniyor...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
