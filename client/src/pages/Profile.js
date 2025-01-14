import React, { useEffect, useState } from "react";
import { fetchProfile, updateUser, updateBio, fetchUserBookLists, fetchBooksInList } from "../services/api";
import './Profile.css'; // CSS dosyasının yolu

const Profile = ({ handleLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [bio, setBio] = useState("");
    const [bookLists, setBookLists] = useState([]); // Kullanıcının kitap listelerini tutacak state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Kullanıcı bilgilerini al
                const data = await fetchProfile();
                setUser(data);
                setBio(data.bio || "");
                setFormData({
                    username: data.username || "",
                    email: data.email || "",
                    password: "",
                });

                // Kullanıcının kitap listelerini al
                const userBookLists = await fetchUserBookLists();
                const detailedLists = await Promise.all(
                    userBookLists.map(async (list) => {
                        const books = await fetchBooksInList(list.list_ID); // Her liste için kitapları al
                        return {
                            listName: list.listname, // Liste adı
                            books, // Listeye ait kitaplar
                        };
                    })
                );
                setBookLists(detailedLists); // Kitap listelerini güncelle
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleBioUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateBio({ bio });
            setUser(updatedUser);
            alert("Biyografi başarıyla güncellendi!");
        } catch (err) {
            alert(`Biyografi güncelleme hatası: ${err.message}`);
        }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(formData);
            setUser(updatedUser);
            alert("Kullanıcı bilgileri başarıyla güncellendi!");
        } catch (err) {
            alert(`Kullanıcı bilgileri güncelleme hatası: ${err.message}`);
        }
    };

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!user) {
        return <p>Profil yükleniyor...</p>;
    }

    return (
        <div>
            <h1>Profil Bilgileri</h1>
            <p><strong>Ad:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.bio && <p><strong>Biyografi:</strong> {user.bio}</p>}

            {/* Kitap Listeleri */}
            <h2>Kitap Listeleri</h2>
            {bookLists.length > 0 ? (
                bookLists.map((list, index) => (
                    <div key={index}>
                        <h3>{list.listName}</h3>
                        <ul>
                            {list.books.length > 0 ? (
                                list.books.map((book, bookIndex) => (
                                    <li key={bookIndex}>
                                        <strong>{book.title}</strong> - {book.author}
                                    </li>
                                ))
                            ) : (
                                <p>Bu liste boş.</p>
                            )}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Kitap listeleriniz boş.</p>
            )}

            {/* Biyografi Güncelleme Formu */}
            <form onSubmit={handleBioUpdate}>
                <h2>Biyografi Güncelle</h2>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    cols="50"
                    placeholder="Biyografinizi güncelleyin"
                />
                <button type="submit">Güncelle</button>
            </form>

            {/* Kullanıcı Bilgileri Güncelleme Formu */}
            <form onSubmit={handleUserUpdate}>
                <h2>Kullanıcı Bilgilerini Güncelle</h2>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Yeni Şifre"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Güncelle</button>
            </form>

            {/* Çıkış Yap Butonu */}
            <button
                onClick={handleLogout}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                LogOut
            </button>
        </div>
    );
};

export default Profile;
