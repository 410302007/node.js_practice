const express = require("express");
const db = require('../modules/connect-mysql');
const upload = require('../modules/upload-img');
const moment = require('moment-timezone');

const router =  express.Router();
router.use((req, res, next)=>{
  const {url, baseUrl, originalUrl}= req;

  res.locals = {...res.locals, url, baseUrl, originalUrl};

  next();
});


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

//新增資料
router.get("/add", async(req, res)=>{
  res.render("ab-add");
});
router.post("/add",upload.none(), async(req, res)=>{
  const output = {
    success:false,
    postData: req.body, //除錯用
    code:0,
    errors:{}
  };

  let {name,email,mobile,birthday,address} = req.body;
  if(!name || name.length<2){
    output.errors.name = '請輸入正確的姓名';
    return res.json(output);
  }

  birthday = moment(birthday);
  birthday = birthday.isValid() ? birthday.format('YYYY-MM-DD'): null;  //格式錯->填空值

  //TODO資料檢查

  const sql = "INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";

  const [result] = await db.query(sql, [
    name,
    email,
    mobile,
    birthday,
    address,
  ]);
  output.result = result;
  output.success = !! result.affectedRows;
  res.json(output);
});

router.get("/edit/:sid", async(req, res)=>{
  const sid = req.params.sid || 0 ; 
   if(!sid){
   // output.error = '沒有 sid';   //顯示錯誤訊息
   return res.redirect(req.baseUrl);  //轉向address-book 列表頁
   }
   const sql ="SELECT * FROM address_book WHERE sid=?";
   const [rows] = await db.query(sql,[sid]);
   if(rows.length<1){
   return res.redirect(req.baseUrl);  //轉向
   }
   const row = rows[0];
  //  res.json(row);

  //從哪裡來
  const referer = req.get('Referer') || req.baseUrl;

  res.render("ab-edit",{...row, referer});
 });

router.put("/edit/:sid", upload.none(), async(req, res)=>{
  // return res.json(req.body); //除錯
  const output = {
    success:false,
    postData: req.body, //除錯用
    code:0,
    errors:{}
  };
  const sid = +req.params.sid ||0;
  if(!sid){
    output.errors.sid = '沒有資料編號';
    return res.json(output);  //API 不要用轉向
  }

  let {name,email,mobile,birthday,address} = req.body;
  if(!name || name.length<2){
    output.errors.name = '請輸入正確的姓名';
    return res.json(output);
  }

  birthday = moment(birthday);
  birthday = birthday.isValid() ? birthday.format('YYYY-MM-DD'): null;  //格式錯->填空值

  //TODO資料檢查

  const sql =  "UPDATE `address_book` SET `name`=?,`email`=?,`mobile`=?,`birthday`=?,`address`=? WHERE `sid`=? ";

  const [result] = await db.query(sql, [
    name,
    email,
    mobile,
    birthday,
    address,
    sid
  ]);
  output.result = result;
  output.success = !! result.changedRows;
  
  //affectedRows
  //changedRows
  res.json(output);
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

router.delete("/:sid", async(req, res)=>{
  const output ={
    success:false,
    error: ''
  };

  const sid = +req.params.sid || 0;  //+req.params.sid->轉換為數值
  if(!sid){
    output.error = '沒有 sid';
    return res.json(output);
  }
  const sql = "DELETE FROM `address_book` WHERE sid=?";

  const [result] = await db.query(sql, [sid]);

  output.success = !! result.affectedRows;

  res.json(output);
});

module.exports = router; 