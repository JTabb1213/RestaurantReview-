const config = require('config');
const Sequelize = require("sequelize");
const pool = config.get('database.pool');

const dbName = config.get('database.db');
const host = config.get('database.host');
const port = config.get('database.port');
const dialect = config.get('database.dialect');
console.log(`Using db: ${dialect}://${host}:${port}/${dbName}`);
const sequelize = new Sequelize(
    dbName,
    config.get('database.user'),
    config.get('database.password'),
    {
        host: host,
        port: port,
        dialect: dialect,
        pool: {
            max: pool.max,
            min: pool.min,
            acquire: pool.acquire,
            idle: pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;