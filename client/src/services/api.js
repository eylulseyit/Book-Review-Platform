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
        const token = localStorage.getItem("token"); // localStorage'dan token al
        if (!token) {
            throw new Error("Token bulunamadı, giriş yapmanız gerek.");
        }

        console.log(token);

        const response = await fetch(`${BASE_URL}/user/getUserProfile`, { // Profil endpoint'ini kullan
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Token'ı Authorization başlığına ekle
                "Content-Type": "application/json",
            },
        });


        if (!response.ok) {
            throw new Error("Profil bilgileri alınnnnnamadı.");
        }

        const data = await response.json();

        console.log(data.bio);
        return data; // Profil verisini döndür
    } catch (error) {
        throw error; // Hata durumunda mesajı fırlat
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
// Kullanıcı kaydı işlemi
export const registerUser = async ({ username, email, password, bio }) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, bio }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Kayıt işlemi başarısız.");
    }

    return response.json(); // Başarılıysa kullanıcı bilgilerini döndürür
};


// Kategorileri API'den çekmek için
export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/books/getAllCategories`);
    if (!response.ok) {
        throw new Error('Kategoriler alınamadı');
    }
    return response.json();
};

// Belirli bir kategorideki kitapları çekmek için
export const fetchBooksByCategory = async (categoryId) => {
    const response = await fetch(`${BASE_URL}/books/getBookByCategory/${categoryId}`);
    if (!response.ok) {
        throw new Error('Kitaplar alınamadı');
    }
    return response.json();
};

