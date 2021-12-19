const http=require('http');
const fs=require('fs');
const WebSocket=require('ws');
const url=require('url');
const path=require('path');

var mysql = require('mysql'); //npm i


const chatBotMysql=require('./chatBotMysql');

var chatBotPage;

fs.readFile('chatBotPage.html',(err,data)=>{
    if(err){
        throw err;
    }

    chatBotPage=data;
});

var httpServer=http.createServer((req,res)=>{

    reqObj=url.parse(req.url).pathname;

    if(reqObj=="/" || reqObj=="/chatBotPage.html"){

        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(chatBotPage);
        res.end();

    }else{
        res.writeHead(404);
        //res.statusCode(404);
        res.end();
    }

}).listen(8060);


var wss=new WebSocket.Server({server : httpServer});

wss.on('connection',(ws)=>{
   
   ws.on('message',(msg)=>{

        console.log('Received : '+msg);

        (async () => {
           
            const botResult = await chatBotMysql.fetchChatReply(msg);

            ws.send(botResult);
           
          })();

   });

//    ws.on('close',function (event) {
//     console.log('The connection has been closed successfully.');
//     //con.destroy();
//   });

   
});


