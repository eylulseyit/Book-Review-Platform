// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Authorization header'ından token al

    if (!token) {
        return res.status(403).json({ message: 'Token gerekli.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');  // Secret key ile token'ı doğrula
        req.user = decoded;  // Kullanıcı bilgisini req.user'a ekle
        next();  // Middleware'den geç ve controller'a git
    } catch (error) {
        res.status(403).json({ message: 'Geçersiz token.' });
    }
};

module.exports = authenticateJWT;
