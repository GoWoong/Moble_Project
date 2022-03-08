const express = require("express");
const app = express();
const server = app.listen(8080, () => {
  console.log("listen to 8080 port");
});
const WebSocket = require("./socket");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

WebSocket(server);
