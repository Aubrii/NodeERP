const { DataTypes } = require('sequelize');


module.exports = model;

//Création du model de données d'un ouvrage
function model(sequelize){
    const attributes = {
        designation: {
            type: DataTypes.STRING
        },
        benefice: {
            type: DataTypes.INTEGER
        },
        aleas: {
            type: DataTypes.INTEGER
        },
        unite: {
            type: DataTypes.STRING
        },
        ratio: {
            type: DataTypes.FLOAT
        },
        uRatio: {
            type: DataTypes.STRING
        },
        fournisseur: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };

    return sequelize.define('Ouvrage', attributes );
};