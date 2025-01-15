import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks, fetchBookReviews, addBookToReadingListAndReview } from '../services/api';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getBookDetailsAndReviews = async () => {
            setLoading(true);
            try {
                // Fetch the book details
                const books = await fetchBooks(); // Assuming this function is working
                const foundBook = books.find((b) => b.book_ID === parseInt(id));
                setBook(foundBook);

                // Fetch the reviews using the book ID
                const fetchedReviews = await fetchBookReviews(foundBook.book_ID);
                setReviews(fetchedReviews);
            } catch (err) {
                setError('Error loading book details or reviews.');
            } finally {
                setLoading(false);
            }
        };

        getBookDetailsAndReviews();
    }, [id]);

    const handleAddToProfileAndReview = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addBookToReadingListAndReview(parseInt(id), parseInt(rating), reviewText);
            alert('Book added to your profile and review submitted!');
            setRating('');
            setReviewText('');
        } catch (err) {
            alert(err.message || 'Error adding book and review.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !book) {
        return <div>Book not found.</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>

            <h3>Reviews</h3>
            <div>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p><strong>{review.username}</strong> - Rating: {review.rating}</p>
                            <p>{review.review_text}</p>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleAddToProfileAndReview}>
                <h3>Add to Your Profile and Review</h3>
                <div>
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reviewText">Review:</label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Review & Add Book'}
                </button>
            </form>
        </div>
    );
};

export default BookDetails;
