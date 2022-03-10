const router = require("express").Router();
const connection = require("../dbConfig");
router.post("/", async (req, res) => {
  var io = req.app.get("socketio");
  const { data1, data2, data3, data4 } = req.body;
  const sql = `SELECT company, product_name, price FROM code_info where manufacturer_code = ${data2} and product_code = ${data3}`;
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    io.emit("sendCode", rows);
    res.send("ok");
  });
});

module.exports = router;
