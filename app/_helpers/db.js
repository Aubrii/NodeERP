const config = require('../db.config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    //
    // sequelize.sync({ force: true }).then(() => {
    //     console.log("Suppression et synchronisation des tables.");
    // });

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize);
    db.Entreprise = require('../models/entreprise.model')(sequelize)
    db.Ouvrage = require("../models/ouvrage.model")(sequelize)
    db.Cout = require("../models/cout.model")(sequelize);
    db.Devis = require('../models/devis.model')(sequelize);
    db.Client = require('../models/client.model')(sequelize);
    db.UserDevis = require('../models/userDevis.model')(sequelize);
    db.SuperAdmin = require('../models/SuperAdmin.model')(sequelize)
    db.OuvrageCout = require('../models/ouvrageCout.model')(sequelize);
    db.SousLot = require('../models/sousLot.model')(sequelize);
    db.SousLotOuvrage = require('../models/sousLotOuvrage.model')(sequelize);
    db.Lot = require('../models/lot.model')(sequelize);



    // db.SuperAdmin = require('../models/superadmin.model')(sequelize)




    // Relation between Client and Devis => One to many
    db.Client.hasMany(db.Devis, { as: "devis" });
    db.Devis.belongsTo(db.Client, {foreignKey: "ClientId", as: "client",});


    // Relation between Ouvrage and Cout => Many to many
    db.Ouvrage.belongsToMany(db.Cout, {through: db.OuvrageCout});
    db.Cout.belongsToMany(db.Ouvrage, {through: db.OuvrageCout});


    // Relation between Ouvrage and SousLot => Many to many
    db.Ouvrage.belongsToMany(db.SousLot, {through: db.SousLotOuvrage});
    db.SousLot.belongsToMany(db.Ouvrage, {through: db.SousLotOuvrage});

    //Relation between Devis and User  => Many to many
    db.Devis.belongsToMany(db.User,{through: db.UserDevis});
    db.User.belongsToMany(db.Devis,{through:db.UserDevis});

    //Relation between SousLot and Lot  => One to many
    db.SousLot.hasMany(db.Lot);
    db.Lot.belongsTo(db.SousLot, {foreignKey: "SousLotId"});

    //Relation between Lot and Devis  => One to many
    db.Lot.hasMany(db.Devis);
    db.Devis.belongsTo(db.Lot, {foreignKey: "LotId"});

    // sync all models with database
    await sequelize.sync({ alter: true });
}
