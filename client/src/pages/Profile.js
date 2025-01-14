import React, { useEffect, useState } from "react";
import { fetchProfile, updateUser, updateBio } from "../services/api";
import './Profile.css'; // CSS dosyasının yolu


const Profile = ({ handleLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [bio, setBio] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await fetchProfile(); // API'den kullanıcı bilgilerini al
                setUser(data);
                setBio(data.bio || ""); // Biyografiyi doldur
                setFormData({
                    username: data.username || "",
                    email: data.email || "",
                    password: "",
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleBioUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateBio({ bio }); // Biyografi API çağrısı
            setUser(updatedUser);
            alert("Biyografi başarıyla güncellendi!");
        } catch (err) {
            alert(`Biyografi güncelleme hatası: ${err.message}`);
        }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(formData); // Kullanıcı bilgilerini güncelleme API çağrısı
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
//okay