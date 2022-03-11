const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = require("socket.io")(server);
const custommer = require("./routes/testRouter.js").router;
const dataReset = require("./routes/testRouter.js").dataReset;
const manager = require("./routes/manager.js");
const fs = require("fs");
const helmet = require("helmet");
const path = require("path");
const port = 4000;
const connection = require("./dbConfig");
server.listen(4000, () => {
  console.log("Server listening port", port);
});

app.use(cors());
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fs.readFile("./public/main.html", (err, data) => {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});
app.set("socketio", io);

io.on("connection", (socket) => {
  socket.on("sendList", (data) => {
    dataReset();
    let sendData = JSON.parse(data);
    let countData = {};
    let sumPrice = 0;
    let salesinfo = "";
    function isObjEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }

      return true;
    }
    sendData.forEach((product) => {
      sumPrice = sumPrice + product.price;
      countData[product.productNumber] = [
        product.companyName,
        product.productName,
        product.price,
        product.productCount,
      ];
    });
    for (let reduceDate in countData) {
      const sql2 = `update registration_db set 갯수 = 갯수 - ${countData[reduceDate][3]} where company = '${countData[reduceDate][0]}' and product_name = '${countData[reduceDate][1]}' and price = ${countData[reduceDate][2]};`;
      connection.query(sql2, (error, rows) => {
        if (error) throw error;
        console.log(`상품 정보 쿼리 완료`);
      });
    }
    for (var salesdate in countData) {
      salesinfo =
        salesinfo + `${countData[salesdate][1]},${countData[salesdate][3]},`;
    }
    countData.allPrice = sumPrice;
    countData.dateInfo = new Date().toLocaleString();
    const sql1 = `INSERT INTO product_info(salesdate,salesprice,salesproduct) VALUES(now(),"${sumPrice}","${salesinfo}");`;
    if (isObjEmpty(sendData) == false) {
      console.log(1);
      connection.query(sql1, (error, rows) => {
        if (error) throw error;
        console.log("판매정보 쿼리 완료");
      });
    }
  });
});

//프론트단에서
app.use("/api/test", custommer);
app.use("/managerPage", manager);
