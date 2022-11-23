const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const  userDevisService = require('../Service/userDevis.service')
const {DataTypes} = require("sequelize");


router.post('/new/:DeviId/:UserId', createSchema, create);


module.exports = router;


function create(req, res, next) {
    userDevisService.create(req.params)
        .then(() => res.send({ message: 'Devis créer' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        DeviId: Joi.number(),
        UserId: Joi.number(),

    });
    validateRequest(req, next, schema);

}