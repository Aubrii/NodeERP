const db = require("../models");
const Ouvrage = db.ouvrage;
const Cout = db.cout;
const Op = db.Sequelize.Op;


//Creation de
exports.createOuvrage = (req, res) => {
    return Ouvrage.create({
        designation: req.body.designation,
        benefice: req.body.benefice,
        aleas: req.body.aleas,
        unite:req.body.unite,
        ratio: req.body.ratio,
        uRatio: req.body.uRatio,
        fournisseur: req.body.fournisseur
    })
        .then((ouvrage) => {
            console.log(">> Creation de l'ouvrage: " + JSON.stringify(ouvrage, null, 4));
            res.send(ouvrage);
        })
        .catch((err) => {
            console.log(">> Erreur lors de la creation de l'ouvrage: ", err);
        });
};

// exports.findAll = (req, res) => {
//     console.log('trts')
//     Ouvrage.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Impossible de recuperer tous les couts."
//             });
//         });
// };



exports.findOne = (req, res) => {
    const id = req.params.id;

    Ouvrage.findByPk(id,{
        include: [
            {
                model: Cout,
                as: "cout",
                // attributes: ["id", "type"],
                // through: {
                //     attributes: [],
                // },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            },
        ],
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver l'ouvrage avec l'id :${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation de l'ouvrage avec l'id :" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Ouvrage.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "L'ouvrage à été mise à jour avec succes"
                });
            } else {
                res.send({
                    message: `L'ouvrage avec l'id :${id} n'a pas pu etre mise à jour. Le cout n'a pas été trouver ou le corps est vide!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation de l'ouvrage avec l'id :" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Ouvrage.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "L'ouvrage à été supprimer ave succès"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer l'ouvrage à l'id :${id}. Le cout n'a pas été trouver!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation de l'ouvrage avec l'id :" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Ouvrage.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Ouvrages à été supprimer avec succès` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de supprimer tous les ouvrages"
            });
        });
};



exports.addOuvrage = (req, res) => {
    console.log('addOUvrage')

    return Cout.findByPk(req.params.coutId)
        .then((cout) => {
            if (!cout) {
                console.log("Tag not found!");
                return null;
            }
            return Ouvrage.findByPk(req.params.ouvrageId).then((ouvrage) => {
                if (!ouvrage) {
                    console.log("Tutorial not found!");
                    return null;
                }
                cout.addOuvrage(ouvrage);
                res.send(`>> added Tutorial id=${ouvrage.id} to Tag id=${cout.id}`);
                return cout;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Tutorial to Tag: ", err);
        });
};

exports.findAll = (req, res) => {
    console.log('trts')
    Ouvrage.findAll({
        include: [
            {
                model: Cout,
                as: "cout",
                // attributes: ["id", "type"],
                // through: {
                //     attributes: [],
                // },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            },
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de recuperer tous les couts."
            });
        });
};

// exports.findOne = (id) => {
//     return Ouvrage.findByPk(id, {
//         include: [
//             {
//                 model: Cout,
//                 as: "cout",
//                 // attributes: ["id", "name"],
//                 // through: {
//                 //     attributes: [],
//                 // },
//                 // through: {
//                 //   attributes: ["tag_id", "tutorial_id"],
//                 // },
//             },
//         ],
//     })
//         .then((ouvrage) => {
//             res.send(ouvrage);
//         })
//         .catch((err) => {
//             console.log(">> Error while finding Tutorial: ", err);
//         });
// };
