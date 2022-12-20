const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const clientService = require('../Service/client.service')
const authorize = require('../_middleware/authorize')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/entreprises/:id', getByCompany);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    clientService.getAll()
        .then(clients => res.json(clients))
        .catch(next);
}

function getByCompany(req, res, next) {
    clientService.getByCompany(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}
function getById(req, res, next) {
    clientService.getById(req.params.id)
        .then(clients => res.json(clients))
        .catch(next);
}


function create(req, res, next) {
    clientService.create(req.body)
        .then(() => res.send({
            message: 'Client créer',
            client: res.body
        }))
        .catch(next);
}

function update(req, res, next) {
    clientService.update(req.params.id, req.body)
        .then(() => res.send({
            message: 'Client modifier',
            client: res.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    clientService.delete(req.params.id)
        .then(() => res.send({
            message: 'Client effacer',
            client: res.body

        }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phonenumber: Joi.number(),
        type: Joi.string(),
        tvaintra: Joi.number(),
        Adresse:{
            adresses: Joi.string(),
            zipcode: Joi.number(),
            city: Joi.string(),
            country: Joi.string(),
        }    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phonenumber: Joi.number(),
        type: Joi.string(),
        tvaintra: Joi.number(),
        AdresseId: Joi.number(),
    })
    validateRequest(req, next, schema);
}
