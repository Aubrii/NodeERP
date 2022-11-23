const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const lotService = require('../Service/lot.service')


router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    lotService.getAll()
        .then(lot => res.json(lot))
        .catch(next);
}

function getById(req, res, next) {
    lotService.getById(req.params.id)
        .then(lot => res.json(lot))
        .catch(next);
}
function create(req, res, next) {
    lotService.create(req.body)
        .then(() => res.send({ message: 'lot créer' }))
        .catch(next);
}

function update(req, res, next) {
    lotService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'lot modifier' }))
        .catch(next);
}

function _delete(req, res, next) {
    lotService.delete(req.params.id)
        .then(() => res.json({ message: 'lot effacer' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        LotId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        LotId:Joi.number()
    })
    validateRequest(req, next, schema);
}

