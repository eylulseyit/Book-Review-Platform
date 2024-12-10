const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const readingList = require('./reading_list');
const book = require('./Book');

const BookInList = sequelize.define('BookInList', {
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    added_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'book_in_list',
    timestamps: false,
    primaryKey: false
});

// İlişkileri tanımlıyoruz
BookInList.belongsTo(ReadingList, { foreignKey: 'list_ID' });
BookInList.belongsTo(Book, { foreignKey: 'book_ID' });

module.exports = BookInList;
