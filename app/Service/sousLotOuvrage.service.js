const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByOuvrageAndSousLot,
};

async function getAll() {
    return await db.SousLotOuvrage.findAll({})
}

async function getById(id) {
    return await getSousLotOuvrage(id);
}

async function deleteByOuvrageAndSousLot(params){
    const sousLotOuvrage = await db.SousLotOuvrage.findOne({
        where:{
            OuvrageId : params.OuvrageId,
            SousLotId : params.SousLotId
        }
    })
    return sousLotOuvrage.destroy()
}


async function getSousLotOuvrage(id) {
    const sousLotOuvrage = await db.SousLotOuvrage.findByPk(id,{});
    if (!sousLotOuvrage) throw 'N existe pas ';
    return sousLotOuvrage;
}


async function create(params) {
    const sousLotOuvrage = new db.SousLotOuvrage(params)
    // save client
    await sousLotOuvrage.save();
}

