const express = require("express");
const db = require('../modules/connect-mysql');

const router =  express.Router();



router.get('/', async(req,res)=>{
  let page = +req.query.page || 1;     //用戶要看第幾頁   //+ =>限定為正

  const perPage = 20;                 //每頁20筆
  const t_sql ="SELECT COUNT(1) totalRows From address_book";   //求總筆數
  const [[{totalRows}]] = await db.query(t_sql);       //[[{totalRows}]]
  const totalPages = Math.ceil(totalRows/perPage);   //總頁數
  res.json({totalRows, totalPages, page});
});
module.exports = router; 