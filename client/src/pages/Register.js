import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // API fonksiyonunu oluşturun


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await registerUser({ username, email, password, bio });
            localStorage.setItem("token", response.token); // Token'ı kaydet
            navigate("/profile"); // Profil sayfasına yönlendir
        } catch (err) {
            setError(err.message || "Kayıt sırasında bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Bio (Opsiyonel)"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
