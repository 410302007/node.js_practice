
const http = require('http');  //直接打套件名稱
const fs = require('fs/promises'); //使用Promise API

const server = http.createServer(async(req, res)=>{          //request 、 response 順序不能顛倒
  console.log(`------------`, req.url);
  const result = await fs.readFile(                         //error -> array
 __dirname + "/esm01.html"
 );
  console.log(result.toString());
  res.end(result.toString());
 });


server.listen(3000);
//ctrl+c 停止server