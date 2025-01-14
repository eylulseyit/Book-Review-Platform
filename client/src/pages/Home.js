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

    // Kategorileri almak için useEffect kullanıyoruz
    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories(); // fetchCategories ile API'den kategorileri alıyoruz
                console.log(fetchedCategories); // API'den gelen veriyi incelemek için
                setCategories(fetchedCategories); // Kategorileri state'e ekliyoruz
            } catch (err) {
                setError('Kategoriler yüklenirken bir hata oluştu.'); // Hata mesajını set ediyoruz
            } finally {
                setLoading(false); // Yükleme bitiyor
            }
        };
        getCategories(); // useEffect çalıştığında kategorileri alıyoruz
    }, []);

    // Kategorilere tıklandığında kitapları almak için
    const handleCategoryClick = async (categoryId) => {
        console.log('Selected category ID:', categoryId);  // Kategori ID'sini kontrol et
        setLoading(true);  // Yükleme durumunu başlat
        try {
            // Burada genre parametresini 'genre:' formatında gönderiyoruz
            const fetchedBooks = await fetchBooksByCategory(categoryId); // Seçilen kategoriye ait kitapları alıyoruz
            setBooks(fetchedBooks);  // Kitapları state'e ekliyoruz
            setSelectedCategory(categoryId); // Seçilen kategori ID'sini state'e ekliyoruz
        } catch (err) {
            console.error('Error fetching books:', err);  // Hata mesajını konsola yazdır
            setError('Kitaplar yüklenirken bir hata oluştu.'); // Hata mesajını set ediyoruz
        } finally {
            setLoading(false);  // Yükleme durumunu sonlandır
        }
    };


    // Yükleniyor durumunda gösterilecek mesaj
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    // Hata durumunda gösterilecek mesaj
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Browse categories and discover books.</p>

            {/* Kategoriler */}
            <div className="category-list">
                {categories.map((category) => (
                    <button
                        key={category.id}  // 'category.id' benzersiz bir anahtar olmalı
                        onClick={() => handleCategoryClick(category.id)}  // 'category.id' ile tıklama işlevi
                        className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                    >
                        {category.name}
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
