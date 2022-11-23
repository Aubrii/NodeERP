const db = require('../_helpers/db');
const {Users} = require("../_helpers/role");


module.exports = {
    getAll,
    create,
    update,
    getDevisByClient,
    getAllDevisUserClient,
    delete: _delete
};

//Récuperation de toute les données Devis Entreprise Client
async function getAll() {
    return await db.Devis.findAll({ include: ["client","entreprise",db.User] });
}

async function getAllDevisUserClient(){
    return devis = await db.Devis.findAll(
    ).then((devis) => {
        return devis;
    }).catch((err) => {
        console.log(">> Error while finding devis: ", err);
    });


}

async function getDevisByClient(clientId) {
    return await db.Client.findByPk(clientId, { include: ["devis"] })
        .then((devis) => {
            return devis;
        })
        .catch((err) => {
            console.log(">> Error while finding devis: ", err);
        });

}

async function create(params) {
    // validate
    if (await db.Devis.findOne({where: {name: params.name}})) {
        throw 'Le nom "' + params.name + '" est deja enregistrer';
    }
    const devis = new db.Devis(params);
    // save devis
    await devis.save();

}

async function update(id, params) {
    const devis = await getDevis(id);

    // validate
    const usernameChanged = params.name && devis.name !== params.name;
    if (usernameChanged && await db.Devis.findOne({ where: { name: params.name } })) {
        throw 'le nom  "' + params.name + '"est deja enregistrer';
    }


    // copy params to user and save
    Object.assign(devis, params);
    await devis.save();
}

async function _delete(id) {
    const devis = await getDevis(id);
    await devis.destroy();
}

// helper functions

async function getDevis(id) {
    const devis = await db.Devis.findByPk(id);
    if (!devis) throw 'Devis Inconnue';
    return devis;
}