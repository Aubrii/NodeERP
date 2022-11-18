
//Création du model de données d'un ouvrage
module.exports = (sequelize, Sequelize) => {
    const Ouvrage = sequelize.define("ouvrage", {
        designation: {
            type: Sequelize.STRING
        },
        benefice: {
            type: Sequelize.STRING
        },
        aleas: {
            type: Sequelize.STRING
        },
        unite: {
            type: Sequelize.STRING
        },
        ratio: {
            type: Sequelize.FLOAT
        },
        uRatio: {
            type: Sequelize.STRING
        },
        fournisseur: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Ouvrage;
};