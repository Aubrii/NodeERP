const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const fournisseurService = require('../Service/fournisseur.service')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    fournisseurService.getAll()
        .then(fournisseur => res.json(fournisseur))
        .catch(next);
}

function getById(req, res, next) {
    fournisseurService.getById(req.params.id)
        .then(fournisseur => res.json(fournisseur))
        .catch(next);
}

function create(req, res, next) {
    fournisseurService.create(req.body)
        .then(() => res.send({
            message: 'Adresse créer',
            fournisseur: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    fournisseurService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'Adresse modifier',
            fournisseur: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    fournisseurService.delete(req.params.id)
        .then(() => res.send({
            message: 'Adresse effacer',
            fournisseur: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        commercialName: Joi.string().empty(''),
        remarque: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        commercialName: Joi.string().empty(''),
        remarque: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
    })
    validateRequest(req, next, schema);
}
