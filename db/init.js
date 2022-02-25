require("dotenv").config();

const dbinfo = {
  host: "localhost",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3306,
};

module.exports = dbinfo;
