const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllCouts,
    getAllFraisDeChantiers
};

async function getAll(entrepriseId) {
    return await db.Ouvrage.findAll({
        include: [db.CoutDuDevis, db.SousLot],
        where:{EntrepriseId: entrepriseId}

    })
}
async function getAllCouts() {
    return await db.Ouvrage.findAll({
        where:{isCout: true},
        include: [db.CoutDuDevis, db.SousLot]
    })
}
async function getAllFraisDeChantiers() {
    return await db.Ouvrage.findAll({
        where:{isFraisDeChantier: true},
        include: [db.Cout, db.SousLot]
    })
}

async function getById(id) {
    return await getOuvrage(id);
}


async function update(id, params) {
    const ouvrage = await getOuvrage(id);
    // validate
    const usernameChanged = params.designation && ouvrage.designation !== params.designation;
    if (usernameChanged && await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }
    // copy params to user and save
    Object.assign(ouvrage, params);
    await ouvrage.save();
}

async function _delete(id) {
    const ouvrage = await getOuvrage(id);
    await ouvrage.destroy();
}

async function getOuvrage(id) {
    const ouvrage = await db.Ouvrage.findByPk(id,{
        include: [db.CoutDuDevis, db.SousLot],
    });
    if (!ouvrage) throw 'Ouvrage Inconnue';
    return ouvrage;
}


async function create(params) {
    if (await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }
    const ouvrage = new db.Ouvrage(params);

    // save client
    await ouvrage.save();

}
