const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const dbinfo = require("../../db/init.js");
const sql = require("../../sql.js");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extends: true }));

const connectionDb = mysql.createConnection(dbinfo);
connectionDb.connect((err) => {
  if (err) throw err;
  console.log("DB Connection Susccess");
});

router.post("/login", async (req, res) => {
  req.session["email"] = "popgun10@naver.com";
  res.send("ok");
});

router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.send("ok");
});

router.post("/:alias", async (req, res) => {
  //if (!req.session.email) {
  //  return res.status(401).send({ error: "you need to login!" });
  //}
  try {
    const result = await requestSql.db(req.params.alias);
    console.log(typeof result);
    var sendJson = JSON.stringify(result);
    console.log(typeof sendJson);
    res.send(sendJson);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

const requestSql = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      connectionDb.query(sql[alias].query + where, param, (err, rows) => {
        if (err) {
          if (err.code != "ER_DUP_ENTRY") console.log(err);
          resolve({
            err,
          });
        } else resolve(rows);
      })
    );
  },
};

module.exports = router;
