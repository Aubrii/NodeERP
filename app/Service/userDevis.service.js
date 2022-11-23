const db = require("../_helpers/db");

module.exports = {
    create,
}
async function create(params) {
    // validate

    const UserDevis = new db.UserDevis(params);
    // save devis
    await UserDevis.save();

}