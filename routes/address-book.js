const express = require("express");
const db = require('../modules/connect-mysql');


const router =  express.Router();



const getListData = async(req,res)=>{
  let page = +req.query.page || 1;     //用戶要看第幾頁   //+ =>轉換數值為正   //若沒有值，就給1

  if(page<1){
    return res.redirect(req.baseUrl+trq.url);    //頁面轉向   //return-> 不再執行
  }
  //如果 page 參數沒有提供或小於 1，則該函數將使用者重定向到應用程式的當前基礎 URL，並附上 trq.url

  const perPage = 20;                 //每頁20筆
  const t_sql ="SELECT COUNT(1) totalRows FROM address_book";   //求總筆數
  const [[{totalRows}]] = await db.query(t_sql);       //[[{totalRows}]]
  const totalPages = Math.ceil(totalRows/perPage);   //總頁數
  
  let rows=[];
  if(totalRows>0){
    if(page>totalPages){
      return res.redirect ("?page=" + totalPages); //頁面轉向到最後一頁
  }
  
  const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage}`;
  
  [rows]= await db.query(sql);
  //轉換時間格式
  //map
}
  return {totalRows, totalPages, page, rows};
};
//新增
router.get("/add", async(req, res)=>{
  res.render("ab-add");
});

router.post("/add", async(req, res)=>{
  res.send('ok');
  // res.render("ab-list",output);
});

router.get("/", async(req, res)=>{
  const output = await getListData(req, res);
  res.render("ab-list",output);
});
router.get("/api", async(req, res)=>{
  const output = await getListData(req, res);
  for(let item of output.rows){
    // item.birthday2 = res.locals.toDateString(item.birthday);
    item.birthday = res.locals.toDateString(item.birthday); //item->object
    item.created_at = res.locals.toDatetimeString(item.created_at);
  }
  //TODO: 用output.rows.forEach() 再寫一次功能
  res.json(output);
});

module.exports = router; 