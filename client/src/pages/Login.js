import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // useEffect ile token kontrolü yapıyoruz
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/profile"); // Eğer kullanıcı zaten giriş yapmışsa direkt profile sayfasına yönlendir
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Önceki hataları temizle

        try {
            const response = await loginUser({ email, password }); // API çağrısı
            localStorage.setItem("token", response.token); // Token'ı kaydet
            setIsLoggedIn(true); // Kullanıcı durumunu güncelle
            navigate("/profile"); // Profile sayfasına yönlendir
        } catch (err) {
            setError(err.message || "Giriş sırasında bir hata oluştu.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
