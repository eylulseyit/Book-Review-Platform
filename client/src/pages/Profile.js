import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api"; // API dosyasından getProfile fonksiyonunu içe aktar

const Profile = () => {
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
    }, []); // Sayfa yüklendiğinde bir kez çalışacak

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
        </div>
    );
};

export default Profile;
