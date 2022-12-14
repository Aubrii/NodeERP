const config = require('../db.config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({sub:user}, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll({
        include:[db.Devis, db.Entreprise, db.Adresse]
    });
}


async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({where: {email: params.email}})) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }
    const user = new db.User(params, {include: [db.Adresse,db.Entreprise]});
    // const userEntreprise = new db.Entreprise(params,{include:[db.User]})


    // save user
    await user.save(params);
    const classRow = await  db.User.findOne({ where: { email: params.email } });
    console.log(classRow)

    await db.UserEntreprise.create({
        UserId:classRow.id,
        EntrepriseId:params.EntrepriseId
    });
}


async function update(id, params) {
    const user = await getUser(id);
//TODO: VOIR LA METHODE POUR UPDATE
    // validate
    const usernameChanged = params.email && user.email !== params.email;
    if (usernameChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    console.log(params);
    let userId =  user.getDataValue('id');
    let entrepriseId =  user.getDataValue('EntrepriseId')
    // console.log("user: " + user.getDataValue('id'))
    console.log("userId: " + user.id);
    console.log("entrepriseId: " + user.EntrepriseId);
    await db.UserEntreprise.create({
        UserId:  user.id,
        EntrepriseId: params.EntrepriseId
    });


    // copy params to user and save
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id,{
        include:[db.Devis, db.Entreprise, db.Adresse]
    });
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

