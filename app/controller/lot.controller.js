const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const lotService = require('../Service/lot.service')
const coutService = require("../Service/cout.service");

router.get('/fraisDeChantier', getFraisDeChantier)
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getFraisDeChantier(req, res, next) {
    lotService.getFraisDeChantier(req.query.DeviId)
        .then(cout => res.json(cout))
        .catch(next);
}

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
        .then((lot) => res.send({

            message: 'lot créer',
            lot: lot
        }))
        .catch(next);
    // console.log("response.send",lot)
}

function update(req, res, next) {
    lotService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'lot modifier',
            lot: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    lotService.delete(req.params.id)
        .then(() => res.json({
            message: 'lot effacer',
            lot: req.body
        }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        devisId : Joi.number(),
        designation: Joi.string(),
        SousLotId:Joi.number()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        SousLotId:Joi.number()
    })
    validateRequest(req, next, schema);
}

