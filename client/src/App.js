import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kullanıcı giriş durumu kontrolü (localStorage'dan token'ı kontrol et)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Token'ı kontrol et
    if (token) {
      setIsLoggedIn(true); // Token varsa kullanıcı giriş yapmış demektir
    } else {
      setIsLoggedIn(false); // Token yoksa kullanıcı giriş yapmamış
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />

          {/* Kullanıcı login değilse login sayfasına yönlendir */}
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
