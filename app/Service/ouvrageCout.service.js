const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByCoutAndOuvrage,
    getOuvragePriceById,
    getAllOuvragePrice
};

async function getAll() {
    return await db.OuvrageCout.findAll({
    })
}


async function getAllOuvragePrice() {
    const sommeCouts = await db.Ouvrage.findAll({
        attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
        include: [
            {
                model: db.CoutDuDevis,
                include: [
                    {
                        model: db.Ouvrage,
                    },
                ],
            },
        ],
        group: ['Ouvrage.id'],
    });
    return sommeCouts;
}


async function getOuvragePriceById(id) {
    // const sommeCouts = await db.Ouvrage.findAll({
    const sommeCouts = await db.Ouvrage.findOne({
        where: { id: id },
        attributes: [[db.Ouvrage.sequelize.fn('SUM', db.Ouvrage.sequelize.col('coutDuDevis.prixUnitaire')), 'sommeCouts']],
        include: [
            {
                model: db.CoutDuDevis,
                include: [
                    {
                        model: db.Ouvrage,
                        where: { id: id },

                    },
                ],
            },
        ],
        // group: ['Ouvrage.id'],

    });
        return sommeCouts;
}

async function getById(id) {
    return await getOuvrage(id);
}

async function deleteByCoutAndOuvrage(params){
    console.log(params)
    const coutId = parseInt(params.CoutId)
    const ouvrageId = parseInt(params.OuvrageId)
    const ouvrageCout = await db.OuvrageCout.findOne({
        where:{
            CoutDuDeviId : coutId,
            OuvrageId : ouvrageId
        }
    })
    console.log(ouvrageCout)
    return ouvrageCout.destroy()
}


async function getOuvrage(id) {
    const ouvrageCout = await db.OuvrageCout.findByPk(id,{});
    if (!ouvrageCout) throw 'N existe pas ';
    return ouvrageCout;
}


async function create(params) {
    const ouvrageCout = new db.OuvrageCout(params)
    // save client
      await ouvrageCout.save();
}

