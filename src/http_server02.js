
const http = require('http');  //直接打套件名稱
const fs = require('fs/promises'); //使用Promise API

const server = http.createServer(async(req, res)=>{          //request 、 response 順序不能顛倒
 const no_return_data = await fs.writeFile(                     //async await -> 使用try catch 除錯
  __dirname + '/header01.txt', 
  JSON.stringify(req. headers, null , 4));

  res.end(`<h2>error: ${no_return_data}</h2>`);
 });


server.listen(3000);
//ctrl+c 停止server