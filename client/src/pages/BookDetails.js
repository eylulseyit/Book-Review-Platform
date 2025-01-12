import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Kitap ID'sini almak için
import { fetchBooks, addBookToProfile } from '../services/api'; // Kitapları API'den çeken ve ekleme fonksiyonu

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBook = async () => {
            try {
                const books = await fetchBooks(); // Tüm kitapları alıyoruz
                const foundBook = books.find((b) => b.book_ID === parseInt(id)); // ID'ye göre kitabı buluyoruz
                setBook(foundBook);
                setReviews(foundBook.reviews || []); // Yorumları kitapla birlikte almak
            } catch (err) {
                setError('Kitap detayları yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        getBook();
    }, [id]);

    const handleAddToProfile = async () => {
        try {
            await addBookToProfile(id);
            alert('Kitap profilinize eklendi!');
        } catch (err) {
            alert('Kitap eklenirken bir hata oluştu.');
        }
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error || !book) {
        return <div>Kitap bulunamadı.</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>

            <h3>Yorumlar</h3>
            <div>
                {reviews.length === 0 ? (
                    <p>There are no comments yet.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p><strong>{review.username}</strong> - Puan: {review.rating}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            <button onClick={handleAddToProfile}>Add to My Profile</button>
        </div>
    );
};

export default BookDetails;
