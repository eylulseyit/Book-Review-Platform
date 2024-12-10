const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const Recommendation = sequelize.define('Recommendation', {
    recommendation_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'recommendation',
    timestamps: false
});

// İlişkileri tanımlıyoruz
Recommendation.belongsTo(User, { foreignKey: 'user_ID' });
Recommendation.belongsTo(Book, { foreignKey: 'book_ID' });

module.exports = Recommendation;
