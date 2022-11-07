module.exports = app => {
    const couts = require("../controller/cout.controller");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", couts.createCout);

    // Retrieve all Tutorials
    router.get("/", couts.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", couts.findOne);

    // Update a Tutorial with id
    router.put("/:id", couts.update);

    // Delete a Tutorial with id
    router.delete("/:id", couts.delete);

    // Delete all Tutorials
    router.delete("/", couts.deleteAll);

    app.use('/api/cout', router);
};