const { DataTypes } = require('sequelize');


module.exports = model;

//Création du model de données d'un ouvrage
function model(sequelize){
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CoutId: {
            type: DataTypes.INTEGER
        },
        isCout: {
            type: DataTypes.BOOLEAN
        },
        isFraisDeChantier: {
            type: DataTypes.BOOLEAN
        }
    };

    return sequelize.define('TypeCouts', attributes );
};