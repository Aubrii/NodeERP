const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  coutService = require('../Service/cout.service')

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    console.log(req.query)
    const entrepriseId = parseInt(req.query.EntrepriseId)
    coutService.getAll(entrepriseId)
        .then(cout => res.json(cout))
        .catch(next);
}

function getById(req, res, next) {
    const entrepriseId = parseInt(req.query.EntrepriseId)
    const id = req.params.id;
    coutService.getById(id, entrepriseId)
        .then(cout => res.json(cout))
        .catch(next);
}

function create(req, res, next) {
    coutService.create(req.body)
        .then(() => res.send({ message: 'cout créer' }))
        .catch(next);
}

function update(req, res, next) {
    coutService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'cout modifier' }))
        .catch(next);
}

function _delete(req, res, next) {
    coutService.delete(req.params.id)
        .then(() => res.json({ message: 'cout effacer' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string(),
        categorie:Joi.string(),
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire: Joi.number(),
        fournisseur: Joi.string(),
        remarque: Joi.string(),
        EntrepriseId: Joi.number(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({

        type: Joi.string(),
        categorie:Joi.string(),
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire: Joi.number(),
        fournisseur: Joi.string(),
        remarque: Joi.string(),
        EntrepriseId: Joi.number(),


    })
    validateRequest(req, next, schema);
}






// Création et enregistre un nouveau Cout
// exports.createCout = (req, res) => {
//     if (!req.body.designation) {
//         res.status(400).send({message: "Ne peut etre vide"});
//         return;
//     }
//     // Création du Cout
//     const cout = {
//         type: req.body.type,
//         categorie: req.body.categorie,
//         designation: req.body.designation,
//         unite: req.body.unite,
//         prixUnitaire: req.body.prixUnitaire,
//         fournisseur: req.body.fournisseur,
//         remarque: req.body.remarque,
//     };
//     // Enregistre le cout dans la base de données
//     Cout.create(cout)
//         .then(data => {res.send(data);})
//         .catch(err => {
//             res.status(500).send({message:err.message || "Impossible de creer un cout"});
//         });
// };
//
//
// // Recupération de tous les couts.
// exports.findAll = (req, res) => {
//     //Création d'une condition utiliser dans un "WHERE"
//     // const condition = req.query.designation ? { req.query.designation: { [Op.like]: `%${designation}%` } } : null;
//     Cout.findAll()
//     // Cout.findAll({ where: condition })
//         .then(data => {res.send(data);})
//         .catch(err => {
//             res.status(500).send({message:err.message || "Impossible de recuperer tous les couts."});
//         });
// };
//
// //Récupération d'un cout grace a son identifiant
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     Cout.findByPk(id)
//         .then(data => {
//             if (data) {
//                 res.send(data);
//             } else {
//                 res.status(404).send({message: `Impossible de trouver le cout avec l'id :${id}.`});
//             }
//         })
//         .catch(err => {
//             res.status(500).send({message: "Erreur de recuperation du cout avec l'id :" + id});
//         });
// };
//
//
// // Mise à jour du cout grace à son identifiant
// exports.update = (req, res) => {
//     const id = req.params.id;
//     Cout.update(req.body, {where: { id: id }})
//         .then(num => {
//             if (num == 1) {
//                 res.send({message: "Le cout à été mise à jour avec succes"});
//             } else {
//                 res.send({message: `Le cout avec l'id :${id} n'a pas pu etre mise à jour. Le cout n'a pas été trouver ou le corps est vide!`});
//             }
//         })
//         .catch(err => {
//             res.status(500).send({message: "Erreur de recuperation du cout avec l'id :" + id});
//         });
// };
//
// // Supprime un cout grace à son identifiant
// exports.delete = (req, res) => {
//     const id = req.params.id;
//     Cout.destroy({where: { id: id }})
//         .then(num => {
//             if (num == 1) {
//                 res.send({message: "Le cout à été supprimer ave succès"});
//             } else {
//                 res.send({message: `Impossible de supprimer le cout à l'id :${id}. Le cout n'a pas été trouver!`});
//             }
//         })
//         .catch(err => {
//             res.status(500).send({message: "Erreur de recuperation du cout avec l'id :" + id});
//         });
// };
//
// // Supprime tous les couts.
// exports.deleteAll = (req, res) => {
//     Cout.destroy({where: {},truncate: false})
//         .then(nums => {
//             res.send({ message: `${nums} Couts à été supprimer avec succès` });
//         })
//         .catch(err => {
//             res.status(500).send({message:err.message || "Impossible de supprimer tous les couts"});
//         });
// };
