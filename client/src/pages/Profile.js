import React, { useEffect, useState } from 'react';
import { fetchProfile, fetchProfileBooks, addBookToProfile } from '../services/api'; // API fonksiyonları

const Profile = () => {
    const [profile, setProfile] = useState(null); // Profil bilgilerini tutuyoruz
    const [profileBooks, setProfileBooks] = useState([]); // Profil kitaplarını tutuyoruz
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profileData = await fetchProfile(); // Profil bilgilerini alıyoruz
                const books = await fetchProfileBooks(); // Profildeki kitapları alıyoruz
                setProfile(profileData);
                setProfileBooks(books);
            } catch (err) {
                setError('Profil bilgileri veya kitaplar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        getProfileData();
    }, []);

    const handleAddBook = async (bookId) => {
        try {
            await addBookToProfile(bookId); // Kitap profilimize ekleniyor
            setProfileBooks((prevBooks) => [...prevBooks, { bookId }]); // Profil kitaplarını güncelliyoruz
            alert('Kitap profilinize eklendi!');
        } catch (err) {
            alert('Kitap eklenirken bir hata oluştu.');
        }
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Profilim</h1>

            {profile && (
                <div>
                    <h3>{profile.username}</h3>
                    <p>{profile.bio}</p> {/* Kullanıcı biyografisini gösteriyoruz */}
                </div>
            )}

            <h3>Profilime Eklediğim Kitaplar</h3>

            <div>
                {profileBooks.length === 0 ? (
                    <p>Henüz profilinize eklediğiniz kitap yok.</p>
                ) : (
                    profileBooks.map((book, index) => (
                        <div key={index} className="profile-book">
                            <p>{book.title}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;
