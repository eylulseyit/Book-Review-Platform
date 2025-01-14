// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user'); // Veya başka bir yöntemle giriş durumunu kontrol edebilirsiniz.
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <h1>Book Platform</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>

                {/* Giriş yapmış kullanıcı için Profile bağlantısı */}
                {isLoggedIn ? (
                    <li>
                        <Link to="/user" className="profile">Profile</Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className="login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
//okay