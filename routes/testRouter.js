const router = require("express").Router();
const connection = require("../dbConfig");
router.post("/", async (req, res) => {
  var io = req.app.get("socketio");
  const { data1, data2, data3, data4 } = req.body;
  const sql = `SELECT company_name, Product_name, price FROM code_info where company = ${data2} and product = ${data3}`;
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    io.emit("sendCode", rows);
    res.send(rows);
  });
});

module.exports = router;
