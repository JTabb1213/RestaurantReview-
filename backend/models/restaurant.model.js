module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurants", {
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return Restaurant;
};