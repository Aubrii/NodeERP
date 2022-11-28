const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  DevisService = require('../Service/devis.service')
const {DataTypes} = require("sequelize");

// routes

router.get('/',  getAll);
router.get('/byClient/:id', getDevisByClient);
router.get('/byUser/:id', getDevisByUser);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getById(req, res, next){
    DevisService.getById(req.params.id)
        .then(devis => res.json(devis))
        .catch(next)
}

function getAll(req, res, next) {
    DevisService.getAll()
        .then(devis => res.json(devis))
        .catch(next);
}


function getDevisByClient(req, res, next) {
    DevisService.getDevisByClient(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}
function getDevisByUser(req, res, next) {
    DevisService.getDevisByUser(req.params.id)
        .then(devis => res.json(devis))
        .catch(next);
}


function create(req, res, next) {
    DevisService.create(req.body)
        .then(() => res.send({
            message: 'Devis créer',
            devis: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    DevisService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Devis modifier',
            devis: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    DevisService.delete(req.params.id)
        .then(() => res.json({
            message: 'Devis effacer',
            devis: req.body
        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string().empty(''),
        status: Joi.string().empty(''),
        ClientId: Joi.number().empty(''),
        LotId: Joi.number().empty(''),
        UserId: Joi.number().empty('')

    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name:Joi.string().empty(''),
        status: Joi.string().empty(''),
        ClientId: Joi.number().empty(''),
        LotId: Joi.number().empty(''),
        UserId: Joi.number().empty('')
    })
    validateRequest(req, next, schema);
}
