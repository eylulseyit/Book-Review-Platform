const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Kullanıcı giriş
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Hatalı şifre" });
        }

        // JWT Token oluştur
        const token = jwt.sign({ id: user.id, username: user.username }, "SECRET_KEY", {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
