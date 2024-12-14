// src/pages/BookList.js
import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookList from '../components/bookList';

const BookListPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="book-list-page">
            <h1>Kitaplar</h1>
            <BookList books={books} />
        </div>
    );
};

export default BookListPage;
