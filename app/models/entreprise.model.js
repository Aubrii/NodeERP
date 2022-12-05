const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        commercialName: {type: DataTypes.STRING, allowNull: false},
        denomination: {type: DataTypes.STRING, allowNull: false},
        formeJuridique: {type: DataTypes.STRING, allowNull: false},
        rcs: {type: DataTypes.INTEGER, allowNull: false},
        siret: {type: DataTypes.INTEGER, allowNull: false},
        nafCode: {type: DataTypes.INTEGER, allowNull: false},
        tvaNumber: {type: DataTypes.INTEGER, allowNull: false},
        capital: {type: DataTypes.INTEGER, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        phoneNumber: {type: DataTypes.INTEGER, allowNull: false},
        AdresseId: {type:DataTypes.INTEGER}
    };

    return sequelize.define('Entreprise', attributes);
}
