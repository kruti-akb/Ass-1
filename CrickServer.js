require('events').EventEmitter.prototype._maxListeners = 0;
// (node:32248) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
const url=require('url');
const http=require('http');
const WebSocket=require('ws');
const fs=require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var crickPage;

function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;

    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(500, { 'Content-Type' : 'text/plain' });
            res.end('500 - Internal Error');
        } 
        else {
            res.writeHead( responseCode, { 'Content-Type' : contentType });
            res.end(data);
        }
    });
}

fs.readFile('crickScore.html',(err,data)=>{

    if(err){
        throw err;
    }

   crickPage=data;

});

var httpServer=http.createServer(function(req,res){

    var reqObj=url.parse(req.url).pathname;

    if(reqObj=="/" || reqObj=="/crickScore.html"){

        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(crickPage);
        res.end();

    }else if(reqObj=="/stadium.jpg"){

        serveStaticFile(res, '/stadium.jpg', 'image/jpg');
    
    }

}).listen(8050);


global.liveScore="0/0";

readline.setPrompt('Enter updated live score ===> ');
readline.prompt();

var wss=new WebSocket.Server({ server : httpServer});

wss.on('connection',(ws)=>{

    
    ws.send(liveScore);

      readline.on('line', function(message) {
          liveScore=message;
        ws.send(liveScore);
        readline.prompt();
    }).on('close',function(){  //chaining events.
        process.exit(0);
    });

});

