const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const ouvrageCoutService = require('../Service/ouvrageCout.service')
const db = require('../_helpers/db');

//
router.get('/price/:id', getOuvragePriceById )
router.delete('/:CoutId/:OuvrageId', _delete);
router.get('/new/:CoutId/:OuvrageId',createSchema, create);
router.get('/', getAll )
router.get('/price', getAllOuvragePrice)
router.get('/:id', getById)

module.exports = router;

function getAll(req, res, next) {
    ouvrageCoutService.getAll()
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}
function getOuvragePriceById(req, res, next) {
    ouvrageCoutService.getOuvragePriceById(req.params.id)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}
function getAllOuvragePrice(req, res, next) {
    ouvrageCoutService.getAllOuvragePrice()
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}
function getById(req, res, next) {
    ouvrageCoutService.getById(req.params.id)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function _delete(req, res, next) {
    ouvrageCoutService.deleteByCoutAndOuvrage(req.params)
        .then(ouvrageCout => res.json(ouvrageCout))
        .catch(next);
}

function create (req, res, next) {
    ouvrageCoutService.create(req.params)
        .then(() => res.json({
            message: 'Cout ajouter à l ouvrage',
            ouvrageCout: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvrageId: Joi.number(),
        CoutDuDeviId: Joi.number()
    });
    validateRequest(req, next, schema);
}