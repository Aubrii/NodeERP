const db = require("../models");
const Ouvrage = db.ouvrage;
const Cout = db.cout;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    console.log('trts')
    Ouvrage.findAll()
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
            console.log(">> Created comment: " + JSON.stringify(ouvrage, null, 4));
            res.send(ouvrage);
        })
        .catch((err) => {
            console.log(">> Error while creating comment: ", err);
        });
};

exports.findOuvrageById = (ouvrageID) => {
    return Ouvrage.findByPk(ouvrageID)
        .then((ouvrage) => {
            return ouvrage;
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
};
