const { DataTypes } = require('sequelize');

module.exports = model;

//Création d'un model de données d'un cout
function model(sequelize){
    const attributes = {
        type: {
            type: DataTypes.STRING
        },
        categorie: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        unite: {
            type: DataTypes.STRING
        },
        prixUnitaire: {
            type: DataTypes.FLOAT
        },
        fournisseur: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remarque: {
            type: DataTypes.STRING,
            allowNull: true
        },


    };

    return  sequelize.define('Cout', attributes );
}
