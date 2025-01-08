// src/services/api.js
const BASE_URL = 'http://localhost:5000/api';

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/books/all`);
    if (!response.ok) {
        throw new Error('Kitaplar alınamadı');
    }
    return response.json();
};

// Profil bilgilerini almak için API fonksiyonu
export const fetchProfile = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user`); // Profil bilgisi için doğru API endpoint'i
        if (!response.ok) {
            throw new Error('Profil bilgileri alınırken bir hata oluştu');
        }
        const data = await response.json();
        return data; // Profil verisini döndür
    } catch (error) {
        throw error;
    }
};


// Profildeki kitapları almak için
export const fetchProfileBooks = async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
        throw new Error('Profil kitapları alınırken bir hata oluştu.');
    }
    const data = await response.json();
    return data.books; // Backend'den gelen kitapları döndürüyoruz
};

// Profilinize kitap eklemek için
export const addBookToProfile = async (bookId) => {
    const response = await fetch(`/api/profile/add-book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
    });
    if (!response.ok) {
        throw new Error('Kitap profilinize eklenemedi');
    }
};

// Kullanıcı giriş işlemi
export const loginUser = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Giriş başarısız.");
    }

    return response.json(); // Token'ı döndürür
};