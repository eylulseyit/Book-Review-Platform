// testcontroller.js

// Veritabanı model dosyalarını gereksinimlere dahil et
const db = require('../models');  // Sequelize ile tanımladığınız modeller

module.exports = {
    // Kullanıcı oluşturma işlevi
    createUser: async (req, res) => {
        try {
            // İstekten gelen veriyi al
            const { username, email, password_hashed, bio } = req.body;

            // Yeni kullanıcıyı veritabanına kaydet
            const newUser = await db.User.create({
                username,
                email,
                password_hashed,
                bio
            });

            // Başarılı bir şekilde oluşturulduğunda yanıt gönder
            return res.status(201).send({
                message: 'Kullanıcı başarıyla oluşturuldu!',
                status: 201,
                data: newUser
            });
        } catch (error) {
            // Hata durumunda hata mesajı gönder
            console.error(error);
            return res.status(500).send({
                message: 'Kullanıcı oluşturulurken bir hata oluştu.',
                error: error.message,
                status: 500
            });
        }
    },

    // Kullanıcıları listeleme işlevi
    getAllUsers: async (req, res) => {
        try {
            // Tüm kullanıcıları al
            const users = await db.User.findAll();

            // Kullanıcıları başarıyla döndür
            return res.status(200).send({
                message: 'Kullanıcılar başarıyla listelendi!',
                status: 200,
                data: users
            });
        } catch (error) {
            // Hata durumunda hata mesajı gönder
            console.error(error);
            return res.status(500).send({
                message: 'Kullanıcılar alınırken bir hata oluştu.',
                error: error.message,
                status: 500
            });
        }
    },

    // Kullanıcıyı ID'ye göre getirme işlevi
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;  // URL parametresinden ID'yi al

            // Kullanıcıyı ID'ye göre bul
            const user = await db.User.findByPk(userId);

            // Kullanıcı bulunduysa, kullanıcıyı döndür
            if (user) {
                return res.status(200).send({
                    message: 'Kullanıcı başarıyla bulundu!',
                    status: 200,
                    data: user
                });
            } else {
                return res.status(404).send({
                    message: 'Kullanıcı bulunamadı.',
                    status: 404
                });
            }
        } catch (error) {
            // Hata durumunda hata mesajı gönder
            console.error(error);
            return res.status(500).send({
                message: 'Kullanıcı alınırken bir hata oluştu.',
                error: error.message,
                status: 500
            });
        }
    },

    // Kullanıcıyı ID'ye göre silme işlevi
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Kullanıcıyı ID'ye göre bul ve sil
            const deletedUser = await db.User.destroy({
                where: { user_ID: userId }
            });

            // Silme işlemi başarılıysa
            if (deletedUser) {
                return res.status(200).send({
                    message: 'Kullanıcı başarıyla silindi!',
                    status: 200
                });
            } else {
                return res.status(404).send({
                    message: 'Silinecek kullanıcı bulunamadı.',
                    status: 404
                });
            }
        } catch (error) {
            // Hata durumunda hata mesajı gönder
            console.error(error);
            return res.status(500).send({
                message: 'Kullanıcı silinirken bir hata oluştu.',
                error: error.message,
                status: 500
            });
        }
    }
};
