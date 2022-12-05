const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        phonenumber: {type: DataTypes.INTEGER, allowNull: false},
        type: {type: DataTypes.STRING, allowNull: false},
        tvaintra:{type: DataTypes.INTEGER,},
        AdresseId:{type:DataTypes.INTEGER}
    };

    return sequelize.define('Client', attributes);
}
