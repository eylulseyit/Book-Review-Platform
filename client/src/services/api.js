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



// Biyografi güncelleme
export const updateBio = async ({ bio }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token bulunamadı, giriş yapmanız gerek.");
    }

    const response = await fetch(`${BASE_URL}/user/update-bio`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
        throw new Error("Biyografi güncellenemedi.");
    }

    return response.json();
};

// Kullanıcı bilgilerini güncelleme
export const updateUser = async ({ username, email, password }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token bulunamadı, giriş yapmanız gerek.");
    }

    const response = await fetch(`${BASE_URL}/user/update-user`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        throw new Error("Kullanıcı bilgileri güncellenemedi.");
    }

    return response.json();
};


// Kategorileri almak için API fonksiyonu
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/books/getAllGenres`, {
            method: "POST",  // Kategorileri almak için POST isteği
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Kategoriler alınamadı');
        }

        const categories = await response.json();
        return categories;  // Kategorileri döndürüyoruz
    } catch (error) {
        throw error;  // Hata durumunda hata mesajını fırlatıyoruz
    }
};

// Kategorilere göre kitapları getiren fonksiyon
export const fetchBooksByCategory = async (genre) => {
    try {
        const response = await fetch(`${BASE_URL}/books/getBookByGenre`, {
            method: "POST",  // POST isteği gönderiyoruz
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ genre }),  // Genre parametresini body olarak gönderiyoruz
        });

        if (!response.ok) {
            throw new Error('Kitaplar alınamadı');
        }

        const books = await response.json();  // Kitapları JSON formatında alıyoruz
        return books;
    } catch (error) {
        throw error;
    }
};


export const fetchUserBookLists = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token bulunamadı, giriş yapmanız gerek.");
        }

        const response = await fetch(`${BASE_URL}/user/booklists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Kitap listeleri alınamadı.");
        }

        return await response.json();
    } catch (error) {
        console.error("fetchUserBookLists hata:", error.message);
        throw error;
    }
};
export const fetchBooksInList = async (listId) => {
    try {
        if (!listId) {
            throw new Error("Geçerli bir liste ID'si sağlanmadı.");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token bulunamadı, giriş yapmanız gerek.");
        }

        const response = await fetch(`${BASE_URL}/booklist/${listId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Liste içindeki kitaplar alınamadı.");
        }

        return await response.json();
    } catch (error) {
        console.error("fetchBooksInList hata:", error.message);
        throw error;
    }
};
