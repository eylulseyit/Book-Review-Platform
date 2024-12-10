const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Veritabanı bağlantısı

const User = sequelize.define('User', {
    user_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password_hashed: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'user',
    timestamps: false  // Otomatik olarak timestamp eklemeyi engeller
});

module.exports = User;
