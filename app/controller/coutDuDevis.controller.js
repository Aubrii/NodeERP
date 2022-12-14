const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const coutDuDevisService = require('../Service/coutDuDevis.service')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    coutDuDevisService.getAll()
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function getById(req, res, next) {
    coutDuDevisService.getById(req.params.id)
        .then(coutDuDevis => res.json(coutDuDevis))
        .catch(next);
}

function create(req, res, next) {
    coutDuDevisService.create(req.body)
        .then(() => res.send({
            message: 'coutDuDevis créer',
            coutDuDevis: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    coutDuDevisService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'coutDuDevis modifier',
            coutDuDevis: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    coutDuDevisService.delete(req.params.id)
        .then(() => res.send({
            message: 'coutDuDevis effacer',
            coutDuDevis: res.body

        }))
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
        // fournisseur: Joi.string(),
        // remarque: Joi.string(),
        Fournisseurs: {
            commercialName: Joi.string(),
            remarque: Joi.string()
        }
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({id: Joi.number(),
        type: Joi.string(),
        categorie:Joi.string(),
        designation: Joi.string(),
        unite: Joi.string(),
        prixUnitaire: Joi.number(),
        fournisseur: Joi.string(),
        remarque: Joi.string(),
    })
    validateRequest(req, next, schema);
}
