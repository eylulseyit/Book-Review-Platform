const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const Review = sequelize.define('Review', {
    review_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    review_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'review',
    timestamps: false
});

// relationships
Review.belongsTo(User, { foreignKey: 'user_ID' });
Review.belongsTo(Book, { foreignKey: 'book_ID' });

module.exports = Review;
