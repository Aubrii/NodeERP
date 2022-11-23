const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  DevisService = require('../Service/devis.service')
const {DataTypes} = require("sequelize");

// routes

router.get('/',  getAll);
router.get('/:id', getDevisByClient);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    DevisService.getAll()
        .then(devis => res.json(devis))
        .catch(next);
}
function getAllDevisUserClient(req, res, next) {
    DevisService.getAllDevisUserClient()
        .then(devis => res.json(devis))
        .catch(next);
}

function getDevisByClient(req, res, next) {
    DevisService.getDevisByClient(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}
function getDevis(req, res, next) {
    DevisService.getDevis(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}


function create(req, res, next) {
    DevisService.create(req.body)
        .then(() => res.send({ message: 'Devis créer' }))
        .catch(next);
}

function update(req, res, next) {
    DevisService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Devis modifier' }))
        .catch(next);
}

function _delete(req, res, next) {
    DevisService.delete(req.params.id)
        .then(() => res.json({ message: 'Devis effacer' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string().empty(''),
        status: Joi.string().empty(''),
        EntrepriseId: Joi.string().empty(''),
        ClientId: Joi.string().empty(''),


    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string().empty(''),
        status: Joi.string().empty(''),


    })
    validateRequest(req, next, schema);
}
