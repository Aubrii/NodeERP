const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Entreprise.findAll({
        // include:["adresse"]
    });
}

async function getById(id) {
    return await getEntreprise(id);
}

async function create(params) {
    // validate
    if (await db.Entreprise.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" est deja enregistrer';
    }

    const entreprise = new db.Entreprise(params,{include:[db.Adresse]});
    console.log('params',params)
    // save client
    await entreprise.save();


}

async function update(id, params) {
    const entreprise = await getEntreprise(id);

    // validate
    const usernameChanged = params.siret && entreprise.siret !== params.siret;
    if (usernameChanged && await db.Entreprise.findOne({ where: { siret: params.siret } })) {
        throw 'le "' + params.siret + '"est deja enregistrer';
    }

    // copy params to user and save
    Object.assign(entreprise, params);
    await entreprise.save();
}

async function _delete(id) {
    const entreprise = await getEntreprise(id);
    await entreprise.destroy();
}

// helper functions

async function getEntreprise(id) {
    const entreprise = await db.Entreprise.findByPk(id,{
        attributes: {
            exclude: ['id','createdAt', 'updatedAt']
        },
        include:{
            model:db.Adresse
        }
    });
    if (!entreprise) throw 'Entreprise Inconnue';
    return entreprise;
}