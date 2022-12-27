//載入env 設定
require('dotenv').config();

//引入express
const express = require('express');

//建立web server 物件
const app = express();

//路由設定， routes
app.get('/',(req, res)=>{
  res.send(`<h1>您好</h1>`);

});
//使用靜態內容的資料夾
app.use(express.static('public'));

//!!所有的路由設定都要放在這行之前!!
app.use((req, res)=>{
  res.type("text/html");
  res.status(404).send(`<h1>404找不到你要的頁面</h1>`);

});

//路由設定， routes
// app.get('/',(req, res)=>{
//   res.send(`<h1>您好</h1>`);

// });
//路由設定放在後面-> 頁面呈現404找不到你要的頁面

const port = process.env.PORT || 3001;  //沒有抓到值(PORT=3002)， 選擇3001
app.listen(port, ()=>{
  console.log(`server started:${port}`); //啟動server port:3002
})