const express = require("express");
const db = require('../modules/connect-mysql');

const router =  express.Router();



router.get('/', async(req,res)=>{
  let page = +req.query.page || 1;     //用戶要看第幾頁   //+ =>限定為正
  
  if(page<1){
    return res.redirect(req.baseUrl);    //頁面轉向   //return-> 不再執行
  }

  const perPage = 20;                 //每頁20筆
  const t_sql ="SELECT COUNT(1) totalRows From address_book";   //求總筆數
  const [[{totalRows}]] = await db.query(t_sql);       //[[{totalRows}]]
  const totalPages = Math.ceil(totalRows/perPage);   //總頁數
  
  let rows=[];
  if(totalRows>0){
    if(page>totalPages){
      return res.redirect ("?page=" + totalPages); //頁面轉向到最後一頁
  }
  
  const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage}`;
  
  [rows]= await db.query(sql);
}
  res.json({totalRows, totalPages, page, rows});
});
module.exports = router; 