const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  coutService = require('../Service/cout.service')
const ouvrageService = require("../Service/ouvrage.service");

// routes

router.get('/', getAll);
router.get('/isCouts', getAllCouts);
router.get('/isFraisDeChantiers', getAllFraisDeChantiers);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    coutService.getAll()
        .then(cout => res.json(cout))
        .catch(next);
}

function getAllCouts(req, res, next) {
    coutService.getAllCouts()
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}
function getAllFraisDeChantiers(req, res, next) {
    coutService.getAllFraisDeChantiers()
        .then(ouvrage => res.json(ouvrage))
        .catch(next);
}

function getById(req, res, next) {
    coutService.getById(req.params.id)
        .then(cout => res.json(cout))
        .catch(next);
}

function create(req, res, next) {
    coutService.create(req.body)
        .then(() => res.send({
            message: 'cout créer',
            cout: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    coutService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'cout modifier',
            cout: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    coutService.delete(req.params.id)
        .then(() => res.send({
            message: 'cout effacer',
            cout: req.body
        }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        type: Joi.string(),
        categorie:Joi.string(),
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire: Joi.number(),
        fournisseur: Joi.string(),
        remarque: Joi.string(),
        isCout: Joi.boolean(),
        isFraisDeChantier: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        type: Joi.string(),
        categorie:Joi.string(),
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire: Joi.number(),
        fournisseur: Joi.string(),
        remarque: Joi.string(),
        isCout: Joi.boolean(),
        isFraisDeChantier: Joi.boolean()


    })

    validateRequest(req, next, schema);
}
