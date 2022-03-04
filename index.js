const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = require("socket.io")(server);
const router = require("./routes/testRouter.js");
const fs = require("fs");
const helmet = require("helmet");
const port = 4000;

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

io.sockets.on("connection", (socket) => {
  socket.on("sendList", (data) => {
    console.log(data);
  });
});

//프론트단에서
app.use("/api/test", router);
