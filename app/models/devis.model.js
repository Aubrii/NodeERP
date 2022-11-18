const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: {type: DataTypes.STRING, allowNull: false},
        status: {type:DataTypes.STRING},

    };

    return sequelize.define('Devis', attributes);
}
