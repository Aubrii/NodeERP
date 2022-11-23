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
        designation: {
            type: DataTypes.STRING
        },
        DeviId: {
            type: DataTypes.INTEGER
        }
    };

    return sequelize.define('Lot', attributes );
};