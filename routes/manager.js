const router = require("express").Router();
const connection = require("../dbConfig");
const path = require("path");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/managerMain.html"));
});

router.get("/manageProduct", async (req, res) => {
  res.send("재고확인");
});

router.get("/registration", async (req, res) => {
  res.send("재품등록");
});

router.get("/sales", async (req, res) => {
  res.send("매출확인");
});

module.exports = router;
