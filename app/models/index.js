const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ouvrage = require("./ouvrage.model")(sequelize,Sequelize)
db.cout = require("./cout.model")(sequelize, Sequelize);

// db.ouvrage.hasMany(db.cout, { as: "cout" });
// db.cout.belongsTo(db.ouvrage, {
//     foreignKey: "ouvrageId",
//     as: "ouvrage",
// });

module.exports = db;