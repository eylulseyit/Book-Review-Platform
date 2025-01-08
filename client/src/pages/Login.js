import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // API fonksiyonunu ekliyoruz

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Hata mesajlarını göstermek için
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Önceki hataları temizle

        try {
            // loginUser API çağrısını kullanarak giriş işlemi
            const response = await loginUser({ email, password });

            // Giriş başarılıysa token'ı localStorage'a kaydet
            localStorage.setItem("token", response.token);

            // Kullanıcıyı profil sayfasına yönlendir
            navigate("/profile");
        } catch (err) {
            // Hata durumunda mesajı ayarla
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
