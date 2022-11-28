const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const sousLotOuvrageService = require('../Service/sousLotOuvrage.service')
const db = require('../_helpers/db');

//
router.delete('/:OuvrageId/:SousLotId', _delete);
router.get('/new/:OuvrageId/:SousLotId',createSchema, create);
router.get('/', getAll )
router.get('/:id', getById )

module.exports = router;

function getAll(req, res, next) {
    sousLotOuvrageService.getAll()
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}
function getById(req, res, next) {
    sousLotOuvrageService.getById(req.params.id)
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}

function _delete(req, res, next) {
    sousLotOuvrageService.deleteByOuvrageAndSousLot(req.params)
        .then(sousLotOuvrage => res.json(sousLotOuvrage))
        .catch(next);
}

function create (req, res, next) {
    sousLotOuvrageService.create(req.params)
        .then(sousLotOuvrage => res.json({
            message: 'ouvrage ajouter au sous lot',
            sousLotOuvrage: sousLotOuvrage

        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        OuvrageId: Joi.number(),
        SousLotId: Joi.number()
    });
    validateRequest(req, next, schema);
}