import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Token kontrolü
    if (token) {
      setIsLoggedIn(true); // Token varsa kullanıcı giriş yapmış demektir
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
            element={isLoggedIn ? <Navigate to="/profile" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
