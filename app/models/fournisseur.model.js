const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commercialName: {type: DataTypes.STRING, allowNull: false},
        remarque: {type: DataTypes.STRING, allowNull: true}
    };

    return sequelize.define('Fournisseur', attributes);
}
