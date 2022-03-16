const router = require("express").Router();
const connection = require("../dbdata/dbConfig.js");
const path = require("path");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/managerMain.html"));
});

router.get("/image", async (req, res) => {
  //저장된 이미지들을 표현할 계획이다.
});

router.get("/manageProduct", async (req, res) => {
  const sql5 = `SELECT product_name, country, company, 상품설명, 상품분류 , 원가, price, 갯수 FROM registration_db;`;
  connection.query(sql5, async (error, rows) => {
    if (error) throw error;
    console.log(rows);
    res.send(rows);
  });
});

router.post("/registration", async (req, res) => {
  const { data1, data2, data3, data4 } = req.body;
  let count;
  let saveData;
  let sql3;
  async function setSql(Data) {
    sql3 = `insert into registration_db(country_code, manufacturer_code, product_code, inspection_code, 제조국, 제조사 , 상품명, 상품설명, 원가 , 판매가 , 상품분류, 갯수)
    VALUE(${data1},${data2},${data3},${data4}, '${Data[0].country}','${Data[0].company}','${Data[0].product_name}','${Data[0]["상품설명"]}',${Data[0]["원가"]},${Data[0].price},'${Data[0]["상품분류"]}',1);`;
  }
  function isEmptyArr(arr) {
    if (Array.isArray(arr) && arr.length === 0) {
      return true;
    }
    return false;
  }
  const sql1 = `SELECT 갯수 FROM registration_db where country_code = ${data1} and manufacturer_code = ${data2} and product_code = ${data3};`;
  const sql2 = `SELECT country, company, product_name, 상품설명, 원가, price, 상품분류 FROM code_info where manufacturer_code = ${data2} and product_code = ${data3}`;
  connection.query(sql1, async (error, rows) => {
    if (error) throw error;
    count = await rows;
    if (isEmptyArr(count) === true) {
      connection.query(sql2, async (error, rows) => {
        if (error) throw error;
        saveData = await rows;
        await setSql(saveData);
        connection.query(sql3, (error, rows) => {
          if (error) throw error;
          console.log("재고 등록");
        });
      });
    } else {
      const sql4 = `update registration_db set 갯수 = 갯수 + 1 where country_code = ${data1} and manufacturer_code = ${data2} and product_code = ${data3} and inspection_code = ${data4};`;
      connection.query(sql4, (error, rows) => {
        if (error) throw error;
        console.log("재고 개수 증가");
      });
    }
  });
  res.send("성공적으로 쿼리했습니다.");
});

router.get("/sales", async (req, res) => {
  const sql6 = `SELECT * FROM product_info;`;
  connection.query(sql6, async (error, rows) => {
    if (error) throw error;
    console.log(rows);
    res.send(rows);
  });
});

module.exports = router;
