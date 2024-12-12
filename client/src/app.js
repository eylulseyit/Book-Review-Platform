import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import BookList from './pages/bookList';
import Profile from './pages/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
