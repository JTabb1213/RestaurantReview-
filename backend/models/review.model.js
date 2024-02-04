module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        review_text: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        // Define the primary key for the table
    });

    return Review;
};
