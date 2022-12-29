const express = require("express");
const db = require('../modules/connect-mysql');

const router =  express.Router();


//求總筆數
router.get('/', async(req,res)=>{
  const t_sql ="SELECT COUNT(1) totalRows From address_book";
  const [[{totalRows}]] = await db.query(t_sql);       //[[{totalRows}]]
  res.json(totalRows);
});
module.exports = router; 