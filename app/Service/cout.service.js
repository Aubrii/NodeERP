const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllFraisDeChantiers,
    getAllCouts
};

async function getAll() {
    return await db.Cout.findAll({});
}
async function getAllCouts() {
    return await db.Cout.findAll({
        include:[db.Ouvrage],
        where:{isCout: true}
    })
}
async function getAllFraisDeChantiers() {
    return await db.Cout.findAll({
        include:[db.Ouvrage],
        where:{isFraisDeChantier: true}
    })
}

async function getById(id) {
    return await getCout(id);
}


async function update(id, params) {
    const cout = await getCout(id);
    // validate
    const coutchanged = params.designation && cout.designation !== params.designation;
    if (coutchanged && await db.Cout.findOne({ where:
            { designation: params.designation }

    })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    Object.assign(cout, params);
    await cout.save();
}

async function _delete(id) {
    const cout = await getCout(id);
    await cout.destroy();
}

async function getCout(id) {
    const cout = await db.Cout.findByPk(id);
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