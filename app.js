const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const dbinfo = require("./db/init.js");
let sql = require("./sql.js");
const fs = require("fs");

const connectionDb = mysql.createConnection(dbinfo);
connectionDb.connect((err) => {
  if (err) throw err;
  console.log("DB Connection Susccess");
});

app.use(
  session({
    secret: "Moble Projext CS24",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.get("/", (req, res) => {
  res.send({ name: "ko" });
});

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 대기중");
});

/*
  실무에서 유용한 코드
*/
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});
/*
  파일을 보고있다 파일의 변경이 일어나면 적용된다.
*/

app.post("/api/login", async (req, res) => {
  req.session["email"] = "popgun10@naver.com";
  res.send("ok");
});

app.post("/api/logout", async (req, res) => {
  req.session.destroy();
  res.send("ok");
});

app.post("/api/:alias", async (req, res) => {
  if (!req.session.email) {
    return res.status(401).send({ error: "you need to login!" });
  }
  try {
    res.send(await requestSql.db(req.params.alias));
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
