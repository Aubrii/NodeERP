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
        fournisseur: {type:DataTypes.STRING},
        remarque: {type:DataTypes.STRING}

    };

    return  sequelize.define('CoutDuDevis', attributes );
}
