const User = require('./models/User'); // Modelinize göre düzenleyin

// Veritabanına yeni bir kullanıcı ekleme
User.create({
    username: '1',
    email: '2',
    password_hashed: '3'
})
    .then((newUser) => {
        console.log('Yeni kullanıcı başarıyla eklendi:', newUser);
    })
    .catch((error) => {
        console.error('Kullanıcı eklenirken bir hata oluştu:', error);
    });
