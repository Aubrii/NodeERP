const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const Role = require('../_helpers/role');
const userService = require('../Service/User.service');
const authorize = require('../_middleware/authorize')
const db = require("../_helpers/db");

// routes

router.get('/',getAll);
router.get('/:id', getById);
router.post('/new', createSchema, create,);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/current', getCurrent);



module.exports = router;

// route functions


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({
            message: 'User created',
            user: req.body
        }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'User updated',
            user: req.body
        }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number(),
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.Users,Role.SuperAdmin).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        AdresseId: Joi.number(),
        EntrepriseId: Joi.number(),
        // Entreprises: [
        //     {
        //         id: Joi.number(),
        //         commercialName:Joi.string(),
        //         denomination:Joi.string(),
        //         formeJuridique: Joi.string(),
        //         rcs: Joi.number(),
        //         siret: Joi.number(),
        //         nafCode:Joi.number(),
        //         tvaNumber:Joi.number(),
        //         capital:Joi.number(),
        //         email: Joi.string(),
        //         phoneNumber:Joi.number(),
        //         AdresseId:Joi.number(),
        //     }]

    },
    //     {
    //     include: [{
    //         include:  [db.Entreprise],
    //         through: [db.UserEntreprise]
    //     }]
    // }
    );
    console.log('toto')
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.Users,Role.SuperAdmin).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        AdresseId: Joi.number(),
    })
    validateRequest(req, next, schema);
}
