const { DataTypes } = require('sequelize');


module.exports = model;

//Création du model de données d'un ouvrage
function model(sequelize){
    const attributes = {
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        benefice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        aleas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ratio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        uRatio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fournisseur: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isCout:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isFraisDeChantier:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    return sequelize.define('Ouvrage', attributes );
};