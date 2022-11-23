const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllCout,
    getAllFraisDeChantier
};

async function getAll() {
    return await db.TypeCout.findAll({
        include: [
            {
                model: db.Cout,
                as: "cout",
            },
        ],
    })
}
async function getAllCout() {
    return await db.TypeCout.findAll({
        where:{
            isCout: true
        },
        include: [
            {
                model: db.Cout,
                as: "cout",
            },
        ],
    })
}async function getAllFraisDeChantier() {
    return await db.TypeCout.findAll({
        where:{
            isFraisDeChantier: true
        },
        include: [
            {
                model: db.Cout,
                as: "cout",
            },
        ],
    })
}

async function getById(id) {
    return await getTypeCout(id);
}


async function update(id, params) {
    const typeCout = await getTypeCout(id);
    Object.assign(typeCout, params);
    await typeCout.save();
}

async function _delete(id) {
    const ouvrage = await getTypeCout(id);
    await ouvrage.destroy();
}

async function getTypeCout(id) {
    const typeCout = await db.TypeCout.findByPk(id,{
        include: [
            {
                model: db.Cout,
                as: "cout",
            },
        ],
    });
    if (!typeCout) throw 'typeCout Inconnu';
    return typeCout;
}


async function create(params) {
    const ouvrage = new db.TypeCout(params);

    // save client
    await ouvrage.save();
}



