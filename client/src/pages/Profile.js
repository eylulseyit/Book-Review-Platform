import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";

const Profile = ({ handleLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await fetchProfile(); // API'den kullanıcı bilgilerini al
                setUser(data); // Kullanıcıyı state'e kaydet
            } catch (err) {
                setError(err.message); // Hata varsa göster
            }
        };

        fetchUserProfile();
    }, []);

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
