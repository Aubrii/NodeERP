const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CoutDuDevis.findAll();
}

async function getById(id) {
    return await getCoutDuDevis(id);
}

async function create(params) {
    const coutDuDevis = new db.CoutDuDevis(params);

    // save client
    await coutDuDevis.save();
}

async function update(id, params) {
    const coutDuDevis = await getCoutDuDevis(id);


    // copy params to user and save
    Object.assign(coutDuDevis, params);
    await coutDuDevis.save();
}

async function _delete(id) {
    const coutDuDevis = await getCoutDuDevis(id);
    await coutDuDevis.destroy();
}

// helper functions

async function getCoutDuDevis(id) {
    const coutDuDevis = await db.CoutDuDevis.findByPk(id);
    if (!coutDuDevis) throw 'cout du devis Inconnue';
    return coutDuDevis;
}