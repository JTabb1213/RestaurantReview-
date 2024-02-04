const Sequelize = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
const User = db.user;

async function findUser(username, password) {
    return User.findOne({ where: { username: username, passwrd: password } });
}

async function createUser(username, password, email) {
    const now = new Date().toISOString();
    return User.create({ username: username, passwrd: password, email: email, createdAt: now, updatedAt: now });
}

module.exports = {
    findUser: findUser,
    createUser: createUser,
}