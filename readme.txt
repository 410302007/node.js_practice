process
行程

thread 
執行緒
//多執行緒->代表在單一個行程中，同時跑多個執行緒
//在多個執行緒裡，不同的執行緒共享資源(ex.變數....)

--------------
輸出給前端
  res.end()
  res.send()
  res.render()
  res.json()
--------------
前端傳入的資料
  req.query()  //取得query string parameters
  req.params   //網址列上的參數
  req.body()   //表單資料
  req.file     //上傳單一檔案時
  req.files    //上傳多個檔案時

  req.session  //使用express-session時
--------------
RESTful API 簡略規則:

GET     /product            #取得資料列表
GET     /product/:pid       #取得單筆資料

POST    /product            #新增資料
PUT     /product/:pid       #修改資料
DELETE  / product/:pid      #刪除資料
