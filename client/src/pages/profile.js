// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/api';
import ProfileCard from '../components/profileCards';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getUserProfile(1); // Örnek olarak 1. kullanıcıyı alıyoruz
            setUser(data);
        };
        fetchUserProfile();
    }, []);

    if (!user) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div className="profile">
            <h1>Profil</h1>
            <ProfileCard user={user} />
        </div>
    );
};

export default Profile;
