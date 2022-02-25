const express = require("express");
const app = express();
const session = require("express-session");
const api = require("./router/api/api.js");
const mainPage = require("./router/mainPage/mainPage.js");
const insert = require("./router/insert/insert.js");

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
app.use("/", express.static("public"));
app.use("/api", api);
app.use("/main", mainPage);
app.use("/insert", insert);

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 대기중");
});
