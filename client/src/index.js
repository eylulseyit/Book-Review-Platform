import React from 'react';
import ReactDOM from 'react-dom/client'; // Yeni import
import './index.css';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot kullanımı
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
