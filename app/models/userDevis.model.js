const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        DeviId: {type: DataTypes.INTEGER},
        UserId: {type:DataTypes.INTEGER},

    };

    return sequelize.define('UserDevis', attributes);
}
