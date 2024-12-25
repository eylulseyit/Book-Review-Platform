// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Stil dosyasını import ediyoruz

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1>My Book Site</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li> {/* Home sayfasına link */}
                <li><Link to="/books">Book List</Link></li> {/* Kitap listesi sayfasına link */}
            </ul>
        </nav >
    );
};

export default Navbar;
