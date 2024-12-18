// src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Yazar:</strong> {book.author}</p>
            <p><strong>Tür:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p>{book.description}</p>
        </div>
    );
};

export default BookCard;
