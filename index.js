//載入env 設定
require('dotenv').config();
const multer = require('multer');               //安裝multer
const upload = require('./modules/upload-img');   //設定上傳暫存目錄

//引入express
const express = require('express');

//建立web server 物件
const app = express();

app.set('view engine','ejs');

//路由開始前
//直接使用use ; 不用分post or get
//TOP-LEVEL MIDDLEWARE
app.use(express.urlencoded({extended :false}));
app.use(express.json());

//自訂middleware
app.use((req,res,next)=>{
  res.locals.title ='寵物店';
  next();     
})


//路由設定， routes
app.get('/',(req, res)=>{
  res.render('main', {name: '陳小明'});   

});

app.get("/json-sales", (req,res)=>{
  const data = require(__dirname + '/data/sales.json');  //require可在程式裡任何地方require 
                                                         //data => array
  console.log(data);  //取得已經是原生類型

  // res.json(data);                   //網頁回傳 json格式
  res.render('json-sales',{data});
})

app.get("/json-sales2", (req, res) => {
  res.locals.title = res.locals.title?  ('測試 - ' +res.locals.title) : '測試';
  const data = require(__dirname + "/data/sales.json");
  const{orderby} = req.query;

  const handleObj = {
    name_asc: {
      label: "姓名由小到大",
      sort: (a, b) => (a.name < b.name ? -1 : 1),
    },
    name_desc: {
      label: "姓名由大到小",
      sort: (a, b) => (a.name > b.name ? -1 : 1),
    },
    age_asc: {
      label: "年齡由小到大",
      sort: (a, b) => a.age - b.age,
    },
    age_desc: {
      label: "年齡由大到小",
      sort: (a, b) => b.age- a.age ,
    },
  };
  // 有對應到 key 才做排序
 if(handleObj[orderby]){
  data.sort(handleObj[orderby].sort);
 }
 res.render("json-sales2", { data, handleObj, orderby });
});

app.get("/json-sales3", (req, res) => {
  const data = require(__dirname + "/data/sales.json");

  const handleAr = [
    {
      key: "name_asc",
      label: "姓名由小到大",
      sort: (a, b) => {},
    },
    {
      key: "name_desc",
      label: "姓名由大到小",
      sort: (a, b) => {},
    },
    {
      key: "age_asc",
      label: "年齡由小到大",
      sort: (a, b) => {},
    },
    {
      key: "age_desc",
      label: "年齡由大到小",
      sort: (a, b) => {},
    },
  ];

  res.render("json-sales", { data, handleObj });
});


app.get("/try-qs", (req,res)=>{
  res.json(req.query);               //queryString重複時=>變array        
                                    //ex: a=1&b=123&a=7  -> {"a":["1","7"],"b":"123"}

})

//放置前面
// const urlencodedParser = express.urlencoded({extended: false});   //application/x-www-form-urlencoded
// const jsonParser = express.json();    //回應json格式(application/json)
// 把 urlencodedParser 當 middleware
//如果有兩個middleware,包成array, 按照順序, 進入路由處理器
//根據檔頭(header)判斷格式
app.post(["/try-post","/try-post2"] ,(req, res)=>{
  res.json(req.body);
});

app.get("/try-post-form", (req, res)=>{
  res.render('try-post-form');
});
app.post("/try-post-form", (req, res)=>{
  res.render('try-post-form',req.body);
  // res.json(req.body);
});

//上傳一張照片
app.post("/try-upload", upload.single('avatar'), (req, res)=>{
  res.json(req.file);
});    

//上傳多張照片(使用 array)
app.post("/try-uploads", upload.array('photos'), (req, res)=>{
  res.json(req.files);
});  
//設定路由-> 越寬鬆規則放越後面，越嚴謹規則放前面
//寬鬆
app.get("/my_params1/:action?/:id?", (req, res)=>{
  res.json(req.params);
});  

//嚴謹(因寬鬆在前，導致看不到)
// app.get("/my_params1/abc", (req, res)=>{
//   res.json(req.params);
// }); 

//手機號碼
app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{
  let u = req.url.slice(3);
  u= u.split('?')[0];  //丟掉query String
  u = u.split('-').join('');
  res.send(u);
});  

//可同時把router掛在不同頁面
app.use(require('./routes/admin2'));   //拿到routes/admin2裡router
app.use('/admins', require('./routes/admin2'));



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