import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem("token", response.token);
            setIsLoggedIn(true);
            navigate("/profile");
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
            <div>
                <p>Hesabınız yok mu?</p>
                <button onClick={() => navigate("/register")}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
