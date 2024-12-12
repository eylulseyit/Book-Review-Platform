// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getBooks = async () => {
    try {
        const response = await api.get('/books');
        return response.data;
    } catch (error) {
        console.error('Kitaplar yüklenemedi:', error);
    }
};
