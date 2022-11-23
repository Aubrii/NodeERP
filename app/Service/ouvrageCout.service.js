const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    deleteByCoutAndOuvrage,
};

async function getAll() {
    return await db.OuvrageCout.findAll({})
}

async function getById(id) {
    return await getOuvrage(id);
}

async function deleteByCoutAndOuvrage(params){
    const ouvrageCout = await db.OuvrageCout.findOne({
        where:{
            CoutId : params.CoutId,
            OuvrageId : params.OuvrageId
        }
    })
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

