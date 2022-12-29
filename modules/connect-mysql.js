const mysql = require('mysql2');

const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'my_practice',
  waitForConnections: true,
  connectionLimit: 5,    //1以上
  queueLimit:0   
});

module.exports = pool.promise();