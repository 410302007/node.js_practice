
const http = require('http');  //直接打套件名稱

const server = http.createServer((request, response)=>{          //request 、 response 順序不能顛倒
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  //沒有end ->不知送什麼給前端
  response.end(`<h2>Hello</h2>   
  <p>${request.url}</p>`
  )
});

server.listen(3000);
//ctrl+c 停止server