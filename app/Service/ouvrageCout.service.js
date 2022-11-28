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
    console.log(params)
    const coutId = parseInt(params.CoutId)
    const ouvrageId = parseInt(params.OuvrageId)
    const ouvrageCout = await db.OuvrageCout.findOne({
        where:{
            CoutId : coutId,
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

