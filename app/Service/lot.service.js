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
    return await db.Lot.findAll({
        include: db.Devis
    })
}

async function getById(id) {
    return await getLot(id);
}


async function update(id, params) {
    const lot = await getLot(id);

    // validate
    const usernameChanged = params.designation && lot.designation !== params.designation;
    if (usernameChanged && await db.Lot.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    // copy params to user and save
    Object.assign(lot, params);
    await lot.save();
}

async function _delete(id) {
    const lot = await getLot(id);
    await lot.destroy();
}

async function getLot(id) {
    const lot = await db.Lot.findByPk(id,{
        include: [
            {
                model: db.Devis
            },
        ],
    });
    if (!lot) throw 'LOT Inconnue';
    return lot;
}


async function create(params) {
    //validate
    if (await db.Lot.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }
    const lot = new db.Lot(params);

    // save client
    await lot.save();
}

