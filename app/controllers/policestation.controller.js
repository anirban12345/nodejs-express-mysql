const PoliceStation = require("../models/policestation.model.js");

// Create and Save a new PoliceStation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a PoliceStation
  const pstation = new PoliceStation({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save PoliceStation in the database
  PoliceStation.create(pstation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PoliceStation."
      });
    else res.send(data);
  });
};

// Retrieve all PoliceStations from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  PoliceStation.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pstations."
      });
    else res.send(data);
  });
};

// Find a single PoliceStation by Id
exports.findOne = (req, res) => {
  PoliceStation.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PoliceStation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PoliceStation with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published PoliceStations
exports.findAllPublished = (req, res) => {
  PoliceStation.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pstations."
      });
    else res.send(data);
  });
};

// Update a PoliceStation identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  PoliceStation.updateById(
    req.params.id,
    new PoliceStation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found PoliceStation with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating PoliceStation with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a PoliceStation with the specified id in the request
exports.delete = (req, res) => {
  PoliceStation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PoliceStation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete PoliceStation with id " + req.params.id
        });
      }
    } else res.send({ message: `PoliceStation was deleted successfully!` });
  });
};

// Delete all PoliceStations from the database.
exports.deleteAll = (req, res) => {
  PoliceStation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pstations."
      });
    else res.send({ message: `All PoliceStations were deleted successfully!` });
  });
};
