module.exports = {
  productList: {
    query: "SELECT * FROM productinfo;",
  },
  productInsert: {
    query: `INSERT INTO productinfo (name,price,count,company) VALUES("진라면",564,50,"오뚜기");`,
  },
};
