const db = require('../_helpers/db');
const {where} = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    addCoutInOuvrage
};

async function getAll() {
    return await db.Ouvrage.findAll({
        include: [
            {
                model: db.Cout,
                as: "Couts",
            },
        ],
    })
}

async function getById(id) {
    return await getOuvrage(id);
}


async function update(id, params) {
    const ouvrage = await getOuvrage(id);

    // validate
    const usernameChanged = params.designation && ouvrage.designation !== params.designation;
    if (usernameChanged && await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
        throw 'le "' + params.designation + '"est deja enregistrer';
    }

    // copy params to user and save
    Object.assign(ouvrage, params);
    await ouvrage.save();
}

async function _delete(id) {
    const ouvrage = await getOuvrage(id);
    await ouvrage.destroy();
}

async function getOuvrage(id) {
    const ouvrage = await db.Ouvrage.findByPk(id,{
        include: [
            {
                model: db.Cout,
                as: "Couts",
            },
        ],
    });
    if (!ouvrage) throw 'Ouvrage Inconnue';
    return ouvrage;
}


async function create(params) {
    // validate
    // if (await db.Ouvrage.findOne({ where: { designation: params.designation } })) {
    //     throw 'designation "' + params.designation + '" est deja enregistrer';
    // }
    const ouvrage = new db.Ouvrage(params);

    // save client
    await ouvrage.save();
}

async function addCoutInOuvrage(coutId, ouvrageId){
    return await db.Ouvrage.update({
        where: {
            id: ouvrageId,
        },
        data: {
            ouvrage_id: {
                    connect: {
                        id: ouvrageId,
                    },
            },
        },
        include: {
            ouvrage_id: true,
        },
    });
    // return await db.Cout.findByPk(coutId)
    //     .then((cout) => {
    //         if (!cout) {
    //             console.log("Tag not found!");
    //             return null;
    //         }
    //         return  db.Ouvrage.findByPk(ouvrageId).then((ouvrage) => {
    //             if (!ouvrage) {
    //                 console.log("Ouvrage introuvable!");
    //                 return null;
    //             }
    //             cout.addCoutInOuvrage(ouvrage);
    //             //res.send(`>> Ajout de l'ouvrage id=${ouvrage.id} et du cout id=${cout.id}`);
    //             return cout;
    //         });
    //     })
}






// exports.addOuvrage = (req, res) => {
//     return Cout.findByPk(req.params.coutId)
//         .then((cout) => {
//             if (!cout) {
//                 console.log("Tag not found!");
//                 return null;
//             }
//             return Ouvrage.findByPk(req.params.ouvrageId).then((ouvrage) => {
//                 if (!ouvrage) {
//                     console.log("Ouvrage introuvable!");
//                     return null;
//                 }
//                 cout.addOuvrage(ouvrage);
//                 res.send(`>> Ajout de l'ouvrage id=${ouvrage.id} et du cout id=${cout.id}`);
//                 return cout;
//             });
//         })