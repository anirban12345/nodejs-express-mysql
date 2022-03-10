module.exports = app => {
  const policestation = require("../controllers/policestation.controller.js");

  var router = require("express").Router();

  // Create a new PoliceStation
  router.post("/", policestation.create);

  // Retrieve all PoliceStations
  router.get("/", policestation.findAll);

  // Retrieve all published PoliceStations
  router.get("/published", policestation.findAllPublished);

  // Retrieve a single PoliceStation with id
  router.get("/:id", policestation.findOne);

  // Update a PoliceStation with id
  router.put("/:id", policestation.update);

  // Delete a PoliceStation with id
  router.delete("/:id", policestation.delete);

  // Delete all PoliceStations
  router.delete("/", policestation.deleteAll);

  app.use('/api/policestation', router);
};
