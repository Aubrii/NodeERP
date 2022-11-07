module.exports = (sequelize, Sequelize) => {
    const Cout = sequelize.define("cout", {
        type: {
            type: Sequelize.STRING
        },
        categorie: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        unite: {
            type: Sequelize.STRING
        },
        prixUnitaire: {
            type: Sequelize.FLOAT
        },
        fournisseur: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remarque: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Cout;
};