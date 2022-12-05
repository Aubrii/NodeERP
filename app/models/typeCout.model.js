const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {type: DataTypes.STRING, allowNull: false},
        categorie: {type: DataTypes.INTEGER, allowNull: false},
        CoutId: {type: DataTypes.STRING, allowNull: false},
    };

    return sequelize.define('TypeCout', attributes);
}
