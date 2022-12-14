const { DataTypes } = require('sequelize');


module.exports = model;

function model(sequelize){
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation: {
            type: DataTypes.STRING
        }
    };

    return sequelize.define('SousLot', attributes );
};