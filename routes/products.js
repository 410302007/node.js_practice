const express = require("express");
const db = require('../modules/connect-mysql');
const upload = require('../modules/upload-img');
const moment = require('moment-timezone');

const router =  express.Router();
router.use((req, res, next)=>{
  const {url, baseUrl, originalUrl}= req;

  res.locals = {...res.locals, url, baseUrl, originalUrl};
  /*  擋住所有路由權限
  if(! req.session.user){  //如果沒有登入會員，就看不到新增資料的表單，連會員資料也須登入才看的到
    req.session.lastPage = req.orginialUrl; //
    return res.redirect ('/login'); //轉向登入的表單
  }
  */
  next();
});
router.get('/toggle-like/:pid', async(req, res)=>{   //確定我的最愛裡是否有這筆商品編號
  const output={
    success:false,
    error:'',
    action: '',
  };
  //加到最愛->必須是已登入的會員
  if(!req.session.user){
    output.error = '必須登入會員，才能加到最愛';
    return res.json(output);
  }
  const sql1 = "SELECT * FROM product_likes WHERE `member_id`=? AND `product_id`=?";
  const[likes] = await db.query(sql1,[
    req.session.user.id,  
    req.params.pid    
  ]);
  if(likes.length){
    const sql2 = "DELETE FROM `product_likes` WHERE sid=" + likes[0].sid   //如果有加入收藏，就拿掉收藏
    const [result] = await db.query(sql2);
    output.success = !!result.affectedRows;   //轉換boolean -> true
    output.action ='delete';                  //1.有的話就拿掉
  }else{
    //TODO :判斷有無此商品

    const sql3 = "INSERT INTO `product_likes`(`member_id`, `product_id`) VALUES(?,?)";
    const [result] = await db.query(sql3,[
      req.session.user.id,
      req.params.pid
    ]);
    //2.沒有的話就加進去
    output.success = !!result.affectedRows;   //轉換boolean -> true
    output.action ='insert';
  }
  res.json(output);
});
router.get('/likes', async(req, res)=>{
  const output={
    logined:false,     //有沒有登入
    error:'',
    likes: [],
  };
  if(!req.session.user){
    return res.json(output);
  }
  output.logined = true;

  const sql = `SELECT product_id FROM product_likes WHERE member_id=${req.session.user.id}
               ORDER BY created_at ASC`;  //依加入的時間進行升冪排序
  const [rows] =await db.query(sql);
  output.likes = rows;

  res.json(output);
});

router.get('/', async(req, res)=>{
  const [rows] = await db.query("SELECT * FROM products");

  res.send(rows); //->array

});

module.exports = router; 