const { DataTypes } = require('sequelize');
const {types} = require("joi");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OuvrageId: {
            type: DataTypes.INTEGER
        },
        SousLotId: {
            type: DataTypes.INTEGER
        },
    };

    return sequelize.define('SousLotOuvrage', attributes);
}
