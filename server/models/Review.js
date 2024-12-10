module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        comment: {
            type: DataTypes.TEXT,
        },
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, { foreignKey: "userId" });
        Review.belongsTo(models.Book, { foreignKey: "bookId" });
    };

    return Review;
};
