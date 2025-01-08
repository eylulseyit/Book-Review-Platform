import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null); // Kullanıcı bilgilerini saklamak için state
    const [error, setError] = useState(""); // Hataları saklamak için state

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // localStorage'dan token al
                if (!token) {
                    throw new Error("Kullanıcı girişi yapılmamış.");
                }

                const response = await fetch("http://localhost:5000/api/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Token'i Authorization başlığına ekle
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Profil bilgileri alınamadı.");
                }

                const data = await response.json();
                setUser(data); // Kullanıcı bilgilerini state'e kaydet
            } catch (err) {
                setError(err.message); // Hata mesajını kaydet
            }
        };

        fetchUserProfile();
    }, []); // Bileşen yüklendiğinde bir kez çalışır

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>; // Hata varsa göster
    }

    if (!user) {
        return <p>Profil yükleniyor...</p>; // Kullanıcı bilgileri yüklenirken
    }

    return (
        <div>
            <h1>Profil Bilgileri</h1>
            <p><strong>Ad:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.bio && <p><strong>Biyografi:</strong> {user.bio}</p>} {/* Biyografi varsa göster */}
        </div>
    );
};

export default Profile;
