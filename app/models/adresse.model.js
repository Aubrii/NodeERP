const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        adresses: {type: DataTypes.STRING, allowNull: false},
        zipcode: {type: DataTypes.INTEGER, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: false}
    };

    return sequelize.define('Adresse', attributes);
}
