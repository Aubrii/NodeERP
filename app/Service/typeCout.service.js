const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(entrepriseId) {
    return await db.TypeCout.findAll({
        where:{EntrepriseId: entrepriseId}
    });
}

async function getById(id) {
    return await getTypeCout(id);
}

async function create(params) {
    const typeCout = new db.TypeCout(params);

    // save client
    await typeCout.save();
}

async function update(id, params) {
    const typeCout = await getTypeCout(id);


    // copy params to user and save
    Object.assign(typeCout, params);
    await typeCout.save();
}

async function _delete(id) {
    const typeCout = await getTypeCout(id);
    await typeCout.destroy();
}

// helper functions

async function getTypeCout(id) {
    const typeCout = await db.TypeCout.findByPk(id);
    if (!typeCout) throw 'typeCout Inconnue';
    return typeCout;
}