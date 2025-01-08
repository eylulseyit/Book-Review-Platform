const BASE_URL = 'http://localhost:5000/api';

// Kitapları çekmek için API fonksiyonu
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
        const token = localStorage.getItem('token'); // Token'ı al
        if (!token) {
            throw new Error("Kullanıcı girişi yapılmamış.");
        }

        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Token'ı başlığa ekle
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Profil bilgileri alınırken bir hata oluştu');
        }

        const data = await response.json();
        return data; // Profil verisini döndür
    } catch (error) {
        throw error;
    }
};

// Profildeki kitapları almak için API fonksiyonu
export const fetchProfileBooks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Kullanıcı girişi yapılmamış.");
    }

    const response = await fetch(`${BASE_URL}/profile/books`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Token'ı başlığa ekle
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Profil kitapları alınırken bir hata oluştu.');
    }

    const data = await response.json();
    return data.books; // Backend'den gelen kitapları döndürüyoruz
};

// Profilinize kitap eklemek için API fonksiyonu
export const addBookToProfile = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Kullanıcı girişi yapılmamış.");
    }

    const response = await fetch(`${BASE_URL}/profile/add-book`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
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

    const data = await response.json();
    // User id'yi ve token'ı döndür
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id); // Kullanıcı id'sini sakla

    return data; // Token ve kullanıcı bilgilerini döndür
};
