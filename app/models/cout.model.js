const { DataTypes } = require('sequelize');

module.exports = model;

//Création d'un model de données d'un cout
function model(sequelize){
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prixUnitaire: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fournisseur: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remarque: {
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

    return  sequelize.define('Cout', attributes );
}
