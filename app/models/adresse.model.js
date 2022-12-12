const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        adresses: {type: DataTypes.STRING, allowNull: false},
        zipcode: {type: DataTypes.INTEGER, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: false}
    };
    // attributes._factory = {autoIncrementField: 'id'}
    // id = ''
    // console.log(attributes._factory  )
    return sequelize.define('Adresse', attributes);
}
