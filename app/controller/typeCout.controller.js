const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  typeCoutService = require('../Service/typeCout.service')


router.get('/', getAll);
router.get('/isCouts', getAllCout);
router.get('/isFraisDeChantier', getAllFraisDeChantier);
router.get('/:id', getById);
router.post('/new', createSchema, create);
router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    typeCoutService.getAll()
        .then(TypeCout => res.json(TypeCout))
        .catch(next);
}
function getAllCout(req, res, next) {
    typeCoutService.getAllCout()
        .then(TypeCout => res.json(TypeCout))
        .catch(next);
}
function getAllFraisDeChantier(req, res, next) {
    typeCoutService.getAllFraisDeChantier()
        .then(TypeCout => res.json(TypeCout))
        .catch(next);
}

function getById(req, res, next) {
    typeCoutService.getById(req.params.id)
        .then(TypeCout => res.json(TypeCout))
        .catch(next);
}
function create(req, res, next) {
    typeCoutService.create(req.body)
        .then(() => res.send({ message: 'typeCOUT créer' }))
        .catch(next);
}

function update(req, res, next) {
    typeCoutService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'typecout modifier' }))
        .catch(next);
}
//
// function _delete(req, res, next) {
//     ouvrageService.delete(req.params.id)
//         .then(() => res.json({ message: 'ouvrage effacer' }))
//         .catch(next);
// }


function createSchema(req, res, next) {
    const schema = Joi.object({
        CoutId:Joi.number(),
        isCout: Joi.boolean(),
        isFraisDeChantier: Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        CoutId:Joi.number(),
        isCout: Joi.boolean(),
        isFraisDeChantier: Joi.boolean(),
    })
    validateRequest(req, next, schema);
}
