const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
//connexion a la base de données grace au fichier db.config
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

//utilisation des differents models de données
db.ouvrage = require("./ouvrage.model")(sequelize,Sequelize)
db.cout = require("./cout.model")(sequelize, Sequelize);


//Relation many to many
// //Création d'une table de relation entre "ouvrage" et "cout"
db.ouvrage.belongsToMany(db.cout,
    {through: 'ouvrageCout',
    as:"cout",
    foreignKey:"ouvrage_id"});

db.cout.belongsToMany(db.ouvrage,
    {through: 'ouvrageCout',
        as:"ouvrage",
        foreignKey:"cout_id"
    });




module.exports = db;