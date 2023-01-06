const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,

};

async function getAll() {
    return await db.Lot.findAll({
        include: [db.Devis, db.SousLot]

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
        include: [db.Devis, db.SousLot]
    });
    if (!lot) throw 'LOT Inconnue';
    return lot;
}



async function create(params) {
// Validate
    if (await db.Lot.findOne({ where: { designation: params.designation } })) {
        throw 'Designation "' + params.designation + '" est déjà enregistrée';
    }

// Create lot
    console.log(params)
    const [lot] = await db.Lot.findOrCreate({
        where: { designation: params.designation },
        defaults: params,
        returning: true // <-- Indique à Sequelize de retourner les données du lot créé
    });

// Get lot ID
    const lotId = lot.getDataValue('id');
    console.log("lotid=>lot.service",lotId)
    const devisId = params.devisId;

// Add relation to Devis table
    const devis = await db.Devis.findByPk(devisId);
    await devis.addLot(lot);

// Set lot ID on sous-lot model
    module.exports.lotId = lotId;

// Return lot
    return { lot: lot, lotId: lotId };
}
































