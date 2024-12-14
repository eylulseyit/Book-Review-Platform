// src/components/BookList.js
import React from 'react';
import BookCard from './bookCards';

const BookList = ({ books }) => {
    return (
        <div className="book-list">
            {books.length > 0 ? (
                books.map((book) => <BookCard key={book.id} book={book} />)
            ) : (
                <p>Henüz kitap bulunamadı.</p>
            )}
        </div>
    );
};

export default BookList;
