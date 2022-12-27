
const http = require('http');  //直接打套件名稱
const fs = require('fs/promises'); //使用Promise API

const server = http.createServer(async(req, res)=>{          //request 、 response 順序不能顛倒
 const error = await fs.writeFile(                         //error -> array
  __dirname + '/header01.txt', 
  JSON.stringify(req. headers, null , 4));

  res.end(`<h2>error: ${error}</h2>`);
 });


server.listen(3000);
//ctrl+c 停止server