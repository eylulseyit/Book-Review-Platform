import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Backend sunucunuzun URL'si

function App() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password_hashed: '',
        bio: ''
    });

    // Kullanıcıları listeleme
    const getUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data.data); // API'den gelen kullanıcıları state'e kaydet
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Yeni kullanıcı oluşturma
    const createUser = async () => {
        try {
            const response = await axios.post(`${API_URL}/users`, newUser);
            alert(response.data.message); // Başarı mesajını göster
            getUsers(); // Kullanıcılar listesini güncelle
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Kullanıcıyı silme
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/users/${userId}`);
            alert(response.data.message); // Silme mesajını göster
            getUsers(); // Kullanıcılar listesini güncelle
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getUsers(); // Sayfa yüklendiğinde kullanıcıları listele
    }, []);

    return (
        <div>
            <h1>User Management</h1>

            <div>
                <h2>Create New User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password_hashed}
                    onChange={(e) => setNewUser({ ...newUser, password_hashed: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={newUser.bio}
                    onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                />
                <button onClick={createUser}>Create User</button>
            </div>

            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.user_ID}>
                        <p>{user.username} - {user.email}</p>
                        <button onClick={() => deleteUser(user.user_ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
