// src/components/ProfileCard.js
import React from 'react';

const ProfileCard = ({ user }) => {
    return (
        <div className="profile-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div>
                <h3>Okunan Kitaplar:</h3>
                <ul>
                    {user.readBooks.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileCard;
