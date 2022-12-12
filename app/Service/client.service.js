const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Client.findAll({
        include:[db.Adresse, db.Devis]
    });
}

async function getById(id) {
    return await getClient(id);
}

async function create(params) {
    // validate
    if (await db.Client.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" est deja enregistrer';
    }

    const client = new db.Client(params,{include:[db.Adresse]});

    // save client
    await client.save();
}

async function update(id, params) {
    const client = await getClient(id);

    // validate
    const clientChanged = params.email && client.email !== params.email;
    if (clientChanged && await db.Client.findOne({ where: { email: params.email } })) {
        throw 'l email : "' + params.email + '"est deja enregistrer';
    }


    // copy params to user and save
    Object.assign(client, params);
    await client.save();
}

async function _delete(id) {
    const client = await getClient(id);
    await client.destroy();
}

// helper functions

async function getClient(id) {
    const client = await db.Client.findByPk(id,{
        include:[db.Adresse, db.Devis]
    });
    if (!client) throw 'Client Inconnue';
    return client;
}