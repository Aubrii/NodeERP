const db = require("../models");
const sequelize = require("sequelize");
//Récupération du model "ouvrage"
const Ouvrage = db.ouvrage;
//Récupération du model "cout"
const Cout = db.cout;
const Op = db.Sequelize.Op;


//Creation et enregistrement d'un Ouvrage
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


//Récupération d'un Ouvrage grace à son identifiant, et des Cout qu'il contient
exports.findOne = (req, res) => {
    const id = req.params.id;
    Ouvrage.findByPk(id,{
        include: [
            {
                model: Cout,
                as: "cout",
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

//Mise à jour d'un ouvrage grace à son identifiant
exports.update = (req, res) => {
    const id = req.params.id;
    Ouvrage.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({message: "L'ouvrage à été mise à jour avec succes"});
            } else {
                res.send({message: `L'ouvrage avec l'id :${id} n'a pas pu etre mise à jour. Le cout n'a pas été trouver ou le corps est vide!`});
            }
        })
        .catch(err => {
            res.status(500).send({message: "Erreur de recuperation de l'ouvrage avec l'id :" + id});
        });
};

//Suppression d'un ouvrage grace à son identifiant
exports.delete = (req, res) => {
    const id = req.params.id;
    Ouvrage.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({message: "L'ouvrage à été supprimer ave succès"});
            } else {
                res.send({message: `Impossible de supprimer l'ouvrage à l'id :${id}. Le cout n'a pas été trouver!`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation de l'ouvrage avec l'id :" + id
            });
        });
};

//Suppresion de tous les ouvrages
exports.deleteAll = (req, res) => {
    Ouvrage.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Ouvrages à été supprimer avec succès` });
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Impossible de supprimer tous les ouvrages"});
        });
};


//Ajout d'un ouvrage et d'un cout dans la table de liaison
//Grace à leurs identifiant
exports.addOuvrage = (req, res) => {
    return Cout.findByPk(req.params.coutId)
        .then((cout) => {
            if (!cout) {
                console.log("Tag not found!");
                return null;
            }
            return Ouvrage.findByPk(req.params.ouvrageId).then((ouvrage) => {
                if (!ouvrage) {
                    console.log("Ouvrage introuvable!");
                    return null;
                }
                cout.addOuvrage(ouvrage);
                res.send(`>> Ajout de l'ouvrage id=${ouvrage.id} et du cout id=${cout.id}`);
                return cout;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Tutorial to Tag: ", err);
        });
};

//Récupération de tous les ouvrages et des couts qu'ils contiennent
exports.findAll = (req, res) => {
    Ouvrage.findAll({
        include: [
            {
                model: Cout,
                as: "cout",
            },
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Impossible de recuperer tous les couts."});
        });
};

exports.getSum = (req, res) => {
    const id = req.params.id;
    Ouvrage.findByPk(id,{
        include: [
            {
                model: Cout,
                as: "cout",
            },
        ],
        attributes: [[sequelize.fn('sum', sequelize.col('prixUnitaire')), 'totalPrix']],
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








// exports.createTableTEST = (req, res) => {
//     db.test = require("../models/cout.model")
//         .then((ouvrage) => {
//             console.log(">> Creation de l'ouvrage: " + JSON.stringify(ouvrage, null, 4));
//             res.send(ouvrage);
//         })
//         .catch((err) => {
//             console.log(">> Erreur lors de la creation de l'ouvrage: ", err);
//         });
// };