const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Fournisseur.findAll();
}

async function getById(id) {
    return await getFournisseur(id);
}

async function create(params) {
    const fournisseur = new db.Fournisseur(params);

    // save client
    await fournisseur.save();
}

async function update(id, params) {
    const fournisseur = await getFournisseur(id);

    // copy params to user and save
    Object.assign(fournisseur, params);
    await fournisseur.save();
}

async function _delete(id) {
    const fournisseur = await getFournisseur(id);
    await fournisseur.destroy();
}

// helper functions

async function getFournisseur(id) {
    const fournisseur = await db.Fournisseur.findByPk(id);
    if (!fournisseur) throw 'Adresse Inconnue';
    return fournisseur;
}