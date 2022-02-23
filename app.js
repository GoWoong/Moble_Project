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
app.use("/api", api);
app.use("/main", mainPage);
app.use("/insert", insert);

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 대기중");
});

/*
  실무에서 유용한 코드

fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

  파일을 보고있다 파일의 변경이 일어나면 적용된다.
*/
