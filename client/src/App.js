import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Register bileşenini import ettik

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Token kontrolü
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token sil
    setIsLoggedIn(false); // Kullanıcı durumunu sıfırla
  };

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} /> {/* Yeni Route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
