import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css'; // Stil dosyası (isteğe bağlı)

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Yazar:</strong> {book.author}</p>
            <p>{book.description.substring(0, 100)}...</p> {/* Açıklamanın ilk 100 karakteri */}
            <Link to={`/books/${book.book_ID}`} className="details-link">
                Detayları Gör
            </Link>
        </div>
    );
};

export default BookCard;
