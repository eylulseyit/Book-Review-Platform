const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Review = require('./Review');

const Comment = sequelize.define('Comment', {
    comment_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comment_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'comment',
    timestamps: false
});

// İlişkileri tanımlıyoruz
Comment.belongsTo(User, { foreignKey: 'user_ID' });
Comment.belongsTo(Review, { foreignKey: 'review_ID' });

module.exports = Comment;
