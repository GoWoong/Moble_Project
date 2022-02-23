const express = require("express");
const router = express.Router();

router.post("/insert", (req, res) => {
  const text = req.body;
  console.log(text);
  res.send({ text: "ok" });
});

module.exports = router;
