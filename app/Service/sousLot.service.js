const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.SousLot.findAll({
        include: [db.Ouvrage],
    })
}

async function getById(id) {
    return await getSousLot(id);
}


async function update(id, params) {
    const sousLot = await getSousLot(id);
    // validate
    const designationChanged = params.designation && sousLot.designation !== params.designation;
    if (designationChanged && await db.SousLot.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    Object.assign(sousLot, params);
    await sousLot.save();
}

async function _delete(id) {
    const sousLot = await getSousLot(id);
    await sousLot.destroy();
}

async function getSousLot(id) {
    const sousLot = await db.SousLot.findByPk(id,{
        include: [db.Ouvrage],
    });
    if (!sousLot) throw 'SousLOT Inconnue';
    return sousLot;
}


async function create(params) {
    // validate
    if (await db.SousLot.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }
    const sousLot = new db.SousLot(params);

    // save client
    await sousLot.save();
}
