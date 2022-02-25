module.exports = {
  productList: {
    query: "SELECT * FROM product_info;",
  },
  productInsert: {
    query: `INSERT INTO product_info (name,price,count,company) VALUES("진라면",564,50,"오뚜기");`,
  },
};
