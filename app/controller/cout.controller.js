const db = require("../models");
const Cout = db.cout;
const Op = db.Sequelize.Op;

// Creer et enregistre un nouveau Cout
exports.createCout = (req, res) => {
    // Validate request
    if (!req.body.designation) {
        res.status(400).send({
            message: "Ne peut etre vide"
        });
        return;
    }
    // Create a Tutorial
    const cout = {
        type: req.body.type,
        categorie: req.body.categorie,
        designation: req.body.designation,
        unite: req.body.unite,
        prixUnitaire: req.body.prixUnitaire,
        fournisseur: req.body.fournisseur,
        remarque: req.body.remarque,
    };

    // Save Tutorial in the database
    Cout.create(cout)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de creer un cout"
            });
        });
};

    // exports.createCout = (cout, ouvrageID) => {
    //     return Cout.create({
    //         type: cout.type,
    //         categorie: cout.categorie,
    //         designation:cout.designation,
    //         unite: cout.unite,
    //         prixUnitaire: cout.prixUnitaire,
    //         fournisseur: cout.fournisseur,
    //         remarque: cout.remarque,
    //         ouvrageId: ouvrageID
    //     })
    //         .then((cout) => {
    //             console.log(">> Created comment: " + JSON.stringify(cout, null, 4));
    //             return cout;
    //         })
    //         .catch((err) => {
    //             console.log(">> Error while creating comment: ", err);
    //         });
    // };

// Recupere tous les couts.
exports.findAll = (req, res) => {
    // const designation = req.query.designation;
    // const condition = designation ? { designation: { [Op.like]: `%${designation}%` } } : null;

    Cout.findAll()
    // Cout.findAll({ where: condition })
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

//Recupere un cout grace a l'ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cout.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver le cout avec l'id :${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation du cout avec l'id :" + id
            });
        });
};


// exports.findOne = (id) => {
//     return Cout.findByPk(id, { include: ["ouvrage"] })
//         .then((cout) => {
//             return cout;
//         })
//         .catch((err) => {
//             console.log(">> Error while finding comment: ", err);
//         });
// };

// Met a jour un cout grace a son ID
exports.update = (req, res) => {
    const id = req.params.id;

    Cout.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le cout à été mise à jour avec succes"
                });
            } else {
                res.send({
                    message: `Le cout avec l'id :${id} n'a pas pu etre mise à jour. Le cout n'a pas été trouver ou le corps est vide!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation du cout avec l'id :" + id
            });
        });
};

// Supprime un cout grace a son ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Cout.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le cout à été supprimer ave succès"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le cout à l'id :${id}. Le cout n'a pas été trouver!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de recuperation du cout avec l'id :" + id
            });
        });
};

// Supprime tous les couts.
exports.deleteAll = (req, res) => {
    Cout.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Couts à été supprimer avec succès` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de supprimer tous les couts"
            });
        });
};
