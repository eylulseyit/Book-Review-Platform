// src/services/api.js
const BASE_URL = 'http://localhost:5000/api';

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
        throw new Error('Kitaplar alınamadı');
    }
    return response.json();
};
