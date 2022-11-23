const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(params) {
    return await db.Cout.findAll({
        where:{
            EntrepriseId : params
        }
    });
}

async function getById(id, params) {
    return await getCout(id, params);
}


async function update(id, params) {
    const cout = await getCout(id, params);

    // validate
    const coutchanged = params.designation && cout.designation !== params.designation;
    if (coutchanged && await db.Cout.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    // copy params to user and save
    Object.assign(cout, params);
    await cout.save();
}

async function _delete(id) {
    const cout = await getCout(id);
    await cout.destroy();
}

async function getCout(id,params) {
    console.log(id)
    console.log(params)
    const cout = await db.Cout.findOne({
        where:{
            EntrepriseId: params,
            id:id
        }
    });
    if (!cout) throw 'cout Inconnue';
    return cout;
}


async function create(params) {
    // validate
    if (await db.Cout.findOne({ where: { designation: params.designation } })) {
        throw 'designation "' + params.designation + '" est deja enregistrer';
    }

    const cout = new db.Cout(params);

    // save client
    await cout.save();
}