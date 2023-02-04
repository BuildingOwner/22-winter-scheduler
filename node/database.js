const mysql = require("mysql2/promise");

exports.pool = mysql.createPool({
  host: "www.cjwstudy.shop",
  user: "dummy-client",
  port: "3306",
  password: "chlwodhks911@",
  database: "MyTodoDB",
});