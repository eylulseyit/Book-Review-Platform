const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ReadingList = sequelize.define('ReadingList', {
    list_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    listname: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'reading_list',
    timestamps: false
});

// Relationship
ReadingList.belongsTo(User, { foreignKey: 'user_ID' });

module.exports = ReadingList;
