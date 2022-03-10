module.exports = app => {
  const policestation = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", policestation.create);

  // Retrieve all Tutorials
  router.get("/", policestation.findAll);

  // Retrieve all published Tutorials
  router.get("/published", policestation.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", policestation.findOne);

  // Update a Tutorial with id
  router.put("/:id", policestation.update);

  // Delete a Tutorial with id
  router.delete("/:id", policestation.delete);

  // Delete all Tutorials
  router.delete("/", policestation.deleteAll);

  app.use('/api/policestation', router);
};
