const sql = require("./db.js");

// constructor
const PoliceStation = function(ps) {
  this.ps_name = ps.ps_name;
  this.ps_address = ps.ps_address;
  this.ps_emailid = ps.ps_emailid;
  this.ps_phoneno = ps.ps_phoneno;
};

PoliceStation.create = (newPoliceStation, result) => {
  sql.query("INSERT INTO pstation SET ?", newPoliceStation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newPoliceStation });
    result(null, { id: res.insertId, ...newPoliceStation });
  });
};

PoliceStation.findById = (ps_id, result) => {
  sql.query(`SELECT * FROM pstation WHERE ps_id = ${ps_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pstation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found PoliceStation with the id
    result({ kind: "not_found" }, null);
  });
};

PoliceStation.getAll = (ps_id, result) => {
  let query = "SELECT * FROM pstation";

  if (ps_id) {
    query += ` WHERE ps_id = '%${ps_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pstation: ", res);
    result(null, res);
  });
};

PoliceStation.getAllPublished = result => {
  sql.query("SELECT * FROM pstation WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("PoliceStations: ", res);
    result(null, res);
  });
};

PoliceStation.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE pstation SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PoliceStation with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated PoliceStation: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

PoliceStation.remove = (id, result) => {
  sql.query("DELETE FROM pstation WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found PoliceStation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

PoliceStation.removeAll = result => {
  sql.query("DELETE FROM pstation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pstation`);
    result(null, res);
  });
};

module.exports = PoliceStation;
