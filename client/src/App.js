import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import BookList from './pages/bookList';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
