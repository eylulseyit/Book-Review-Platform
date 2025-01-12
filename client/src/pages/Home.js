import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchBooksByCategory } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                setError('Kategoriler yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        setLoading(true);
        try {
            const fetchedBooks = await fetchBooksByCategory(categoryId);
            setBooks(fetchedBooks);
            setSelectedCategory(categoryId);
        } catch (err) {
            setError('Kitaplar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Hoşgeldiniz!</h1>
            <p>Kategorilere göz atın ve kitapları keşfedin.</p>

            {/* Kategoriler */}
            <div className="category-list">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`category-button ${selectedCategory === category.id ? 'active' : ''
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Kitaplar */}
            {selectedCategory && (
                <div className="book-list">
                    {books.length === 0 ? (
                        <p>Bu kategoride henüz kitap bulunmuyor.</p>
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
            )}
        </div>
    );
};

export default Home;
