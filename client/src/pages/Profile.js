import React, { useEffect, useState } from "react";
import { fetchProfile, fetchProfileBooks } from "../services/api";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [profileBooks, setProfileBooks] = useState([]);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profileData = await fetchProfile();
                setProfile(profileData); // Profil bilgilerini set et
            } catch (error) {
                console.error("Profil bilgileri alınamadı:", error);
            }
        };

        const getProfileBooks = async () => {
            try {
                const booksData = await fetchProfileBooks();
                setProfileBooks(booksData); // Profildeki kitapları set et
            } catch (error) {
                console.error("Profil kitapları alınamadı:", error);
            }
        };

        getProfileData();
        getProfileBooks();
    }, []);

    return (
        <div>
            {profile ? (
                <div>
                    <h2>{profile.username}'s Profile</h2>
                    <p>{profile.bio}</p>

                    <h3>Books in Profile</h3>
                    <ul>
                        {profileBooks.length > 0 ? (
                            profileBooks.map((book, index) => (
                                <li key={index}>
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                    <p>{book.description}</p>
                                    {/* Kitap hakkında yorumlar ve diğer bilgileri buraya ekleyebilirsiniz */}
                                </li>
                            ))
                        ) : (
                            <p>No books found in your profile</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
