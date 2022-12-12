const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const typeCoutService = require('../Service/typeCout.service')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    typeCoutService.getAll(req.query.EntrepriseId)
        .then(clients => res.json(clients))
        .catch(next);
}

function getById(req, res, next) {
    typeCoutService.getById(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}

function create(req, res, next) {
    typeCoutService.create(req.body)
        .then(() => res.send({
            message: 'TypeCout créer',
            client: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    typeCoutService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'TypeCout modifier',
            typeCout: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    typeCoutService.delete(req.params.id)
        .then(() => res.send({
            message: 'TypeCout effacer',
            typeCout: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().empty(''),
        categorie: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().empty(''),
        categorie: Joi.string().empty(''),
        CoutId: Joi.number().empty(''),
        EntrepriseId: Joi.number()
    })
    validateRequest(req, next, schema);
}
