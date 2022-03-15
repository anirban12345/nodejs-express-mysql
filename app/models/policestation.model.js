const sql = require("./db.js");

// constructor
const PoliceStation = function(ps) {
  this.ps_name = ps.ps_name;
  this.ps_address = ps.ps_address;
  this.ps_emailid = ps.ps_emailid;
  this.ps_phoneno = ps.ps_phoneno;
  //console.log(ps);
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

PoliceStation.findByPSName = (ps_name, result) => {
  sql.query(`SELECT * FROM pstation WHERE ps_name like '%${ps_name}%'`, (err, res) => {
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

PoliceStation.getAll = (ps_name, result) => {
  let query = "SELECT * FROM pstation";

  if (ps_name) {
    query += ` WHERE ps_name like '%${ps_name}%'`;
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

PoliceStation.updateById = (id, pstation, result) => {
  sql.query(
    "UPDATE pstation SET ps_name = ?, ps_address = ?, ps_emailid = ?, ps_phoneno = ? WHERE ps_id = ?",
    [pstation.ps_name, pstation.ps_address, pstation.ps_emailid, pstation.ps_phoneno , id],
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

      console.log("updated PoliceStation: ", { id: id, ...pstation });
      result(null, { id: id, ...pstation });
    }
  );
};

PoliceStation.remove = (id, result) => {
  sql.query("DELETE FROM pstation WHERE ps_id = ?", id, (err, res) => {
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
