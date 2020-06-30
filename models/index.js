const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);

/**
 * @description configure sequelize whoth config from dbConfig
 * @description import all schema , initialize them and export
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire
    }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.transacions = require('./transaction.model.js')(sequelize, Sequelize);

module.exports = db;