// src/components/ReviewForm.js
import React, { useState } from 'react';

const ReviewForm = ({ bookId, onSubmitReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitReview({ bookId, rating, comment });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Yorumunuz:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Puanınız (1-5):</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <button type="submit">Yorumu Gönder</button>
        </form>
    );
};

export default ReviewForm;
