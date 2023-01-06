const db = require('../_helpers/db');
const {where} = require("sequelize");
const lotId = require('./lot.service');





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
    const sousLot = db.SousLot.findOne({
        where: { id: id }, // Rechercher le SousLot avec l'ID spécifié
        include: [{ // Inclure les Ouvrages associés au SousLot
            model: db.Ouvrage,
            through: {
                attributes: [] // Exclure les attributs de la table de liaison (SousLotOuvrage) de la réponse
            }
        }]
    });
    if (!sousLot) throw 'SousLot Inconnu';
    return sousLot;
}



// Dans le service de sous-lots
async function create(params,Id) {
// Validate
    if (await db.SousLot.findOne({ where: { designation: params.designation } })) {
        throw 'Designation "' + params.designation + '" est déjà enregistrée';
    }

// Create sous-lot
    const sousLot = new db.SousLot(params);
    await sousLot.save();

// Get sous-lot ID
    const sousLotId = sousLot.getDataValue('id');
    console.log("ID",Id)
    console.log(params)

// Get lot ID from sous-lot model
//     const lotId = sousLotModel.getDataValue('LotId');
    console.log("lotid=>souslot.service",lotId.lotId)
// Create relation between sous-lot and lot
//     const lot = await db.Lot.findByPk(lotId.lotId);
    await sousLot.addLot(Id);

    return sousLot;
}

























