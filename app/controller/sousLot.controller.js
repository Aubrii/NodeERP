const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  sousLotService = require('../Service/sousLot.service')


router.get('/', getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    sousLotService.getAll()
        .then(sousLot => res.json(sousLot))
        .catch(next);
}

function getById(req, res, next) {
    sousLotService.getById(req.params.id)
        .then(sousLot => res.json(sousLot))
        .catch(next);
}
function create(req, res, next) {
    sousLotService.create(req.body)
        .then(() => res.send({ message: 'sousLot créer' }))
        .catch(next);
}

function update(req, res, next) {
    sousLotService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'sousLot modifier' }))
        .catch(next);
}

function _delete(req, res, next) {
    sousLotService.delete(req.params.id)
        .then(() => res.json({ message: 'sous lot effacer' }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        designation: Joi.string(),
        idLot:Joi.number(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({

        designation: Joi.string(),
        LotId:Joi.number(),


    })
    validateRequest(req, next, schema);
}
