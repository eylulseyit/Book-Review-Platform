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
                console.log(fetchedCategories); // Kategorileri kontrol et
                setCategories(fetchedCategories);
            } catch (err) {
                setError('Kategoriler yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);


    const handleCategoryClick = async (categoryName) => {
        if (!categoryName) {
            setError('Geçerli bir kategori seçilmedi.');
            return;
        }

        setSelectedCategory(categoryName);
        try {
            console.log(`Selected category: ${categoryName}`);
            const fetchedBooks = await fetchBooksByCategory(categoryName);
            setBooks(fetchedBooks);  // Kitapları state'e alıyoruz
        } catch (err) {
            setError('Kitaplar alınamadı');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Browse categories and discover books.</p>

            <div className="category-list">
                {categories.map((category) => (
                    <button
                        key={category.genre}  // Benzersiz olan category.genre'i key olarak kullanıyoruz
                        onClick={() => handleCategoryClick(category.genre)}  // category.genre'i kullanıyoruz
                        className={`category-button ${selectedCategory === category.genre ? 'active' : ''}`}
                    >
                        <span>{category.genre}</span>  {/* Kategori ismi buraya ekleniyor */}
                    </button>
                ))}
            </div>


            {/* Kitaplar */}
            {selectedCategory && (
                <div className="book-list">
                    {books.length === 0 ? (
                        <p>Bu kategoride henüz kitap yok.</p> // Eğer kitap yoksa bu mesajı göster
                    ) : (
                        books.map((book) => (
                            <div
                                key={book.book_ID}  // 'book.book_ID' benzersiz bir anahtar olmalı
                                className="book-card"
                                onClick={() => navigate(`/books/${book.book_ID}`)}  // Kitaba tıklandığında detay sayfasına yönlendiriyoruz
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
