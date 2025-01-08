const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hashed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'user',
    timestamps: false
});

User.beforeCreate(async (user) => {
    if (user.password) {
        user.password_hashed = await bcrypt.hash(user.password, 10);
        user.password = undefined; // Make sure the plaintext password is not stored
    }
});

module.exports = User;
