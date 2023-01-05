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
router.get('/', async(req, res)=>{
  const [rows] = await db.query("SELECT * FROM products");

  res.send(rows);

});

module.exports = router; 