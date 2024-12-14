// src/services/api.js
const API_URL = 'http://localhost:5000'; // Backend API'si

// Kitapları al
export const getBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/books`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Kitaplar alınırken hata oluştu:", error);
    }
};

// Kullanıcı profilini al
export const getUserProfile = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Kullanıcı profili alınırken hata oluştu:", error);
    }
};

// Kitap yorumları ekle
export const addReview = async (review) => {
    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Yorum eklenirken hata oluştu:", error);
    }
};

// Yeni kitap ekle (Admin)
export const addBook = async (book) => {
    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Kitap eklenirken hata oluştu:", error);
    }
};
