const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ReadingList = require('./ReadingList');  // Corrected name
const Book = require('./Book');

const BookInList = sequelize.define(
    'BookInList',
    {
        added_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        list_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'reading_list',  // Corrected name
                key: 'list_ID',
            },
        },
        book_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'book_ID',
            },
        },
    },
    {
        tableName: 'book_in_list',
        timestamps: false,
        primaryKey: false, // Disable Sequelize's default primary key
    }
);

// Manually set the composite primary key
BookInList.removeAttribute('id');
BookInList.primaryKeyAttributes = ['list_ID', 'book_ID'];
BookInList.belongsTo(Book, { foreignKey: 'book_ID' });
BookInList.belongsTo(ReadingList, { foreignKey: 'list_ID' });

module.exports = BookInList;
