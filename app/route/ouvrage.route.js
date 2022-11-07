
module.exports = app => {
    const ouvrage = require("../controller/ouvrage.controller");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", ouvrage.createOuvrage);

    // Retrieve all Tutorials
    router.get("/", ouvrage.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", ouvrage.findOuvrageById);

    // Update a Tutorial with id
    // router.put("/:id", ouvrage.);
    //
    // // Delete a Tutorial with id
    // router.delete("/:id", ouvrage.delete);
    //
    // // Delete all Tutorials
    // router.delete("/", ouvrage.deleteAll);

    app.use('/api/ouvrage', router);
};