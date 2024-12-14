// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>Kitap Okuma Sayfası</h1>
            <nav>
                <ul>
                    <li><Link to="/">Ana Sayfa</Link></li>
                    <li><Link to="/profile">Profil</Link></li>
                    <li><Link to="/books">Kitaplar</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
