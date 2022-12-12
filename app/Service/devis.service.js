const db = require('../_helpers/db');

module.exports = {
    getAll,
    create,
    update,
    getDevisByClient,
    getDevisByUser,
    delete:_delete,
    getById
};

//Récuperation de toute les données Devis Entreprise Client
async function getAll() {
    return await db.Devis.findAll({ include: [db.Client,db.User, db.Lot] });
}
async function getById(id) {
    return await db.Devis.findByPk(id,{ include: [db.Client,db.User, db.Lot,db.Entreprise] });
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
async function getDevisByUser(userId) {
    return await db.User.findByPk(userId,{
        include:[db.Devis]
    })
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

    // await db.UserEntreprise.create(UserId:classRow.datavalue.id, { through: db.UserEntreprise });
    await devis.save();
    const classRow = await  db.Devis.findOne({ where: { name: params.name } });
    console.log(classRow)

    await db.UserDevis.create({
        DeviId:classRow.id,
        UserId:params.UserId
    });
    // save devis

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