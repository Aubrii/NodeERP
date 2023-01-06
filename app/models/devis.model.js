const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: {type: DataTypes.STRING, allowNull: false},
        status:{type: DataTypes.STRING, allowNull: false},
        ClientId: {type:DataTypes.INTEGER},
        EntrepriseId: {type:DataTypes.INTEGER},
        UserId: {type:DataTypes.INTEGER},
    };

    return sequelize.define('Devis', attributes);
}
