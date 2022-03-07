const express = require("express");
const app = express();
const server = app.listen(8080, () => {});
const WebSocket = require("./socket");

app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

WebSocket(server);
