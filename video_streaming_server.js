const http=require('http');
const fs=require('fs');
const url=require('url');
const path=require('path');

http.createServer(function(req,res){

    var reqObj=url.parse(req.url).pathname;
    if(reqObj=="/favicon.ico"){

        res.writeHead(404);
        res.end();

    }else if(reqObj=="/" || reqObj=="/index.html"){     
        
        fs.readFile('index.html',function(err,data){
            if(err){
                throw err;
            }
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            
        });

    }else{

        var FilePath="."+reqObj;

        //console.log(FilePath);

        fs.stat(FilePath,function(err,stat){
            if (err) {
                if (err.code === 'ENOENT') {
                  res.write("File is not found");
                }
              res.end(err);
              }

             var range=req.headers.range;

            if(!range){
                return res.sendStatus(416);
            }

            

            var positions=range.replace(/bytes=/,"").split("-");

            var start=parseInt(positions[0]);
            var total=stat.size;
            var end=positions[1] ? parseInt(positions[1]) : total-1;
            var chunkSize=(end-start)+1;
           
            res.writeHead(206,{
                'Accept-Ranges':'bytes',
                'Content-Range':'bytes '+start+'-'+end+'/'+total,
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            });

            var stream = fs.createReadStream(FilePath, { start: start, end: end })
            .on("open", function() {
              stream.pipe(res);
            }).on("error", function(err) {
              res.end(err);
            });


        });

    }
   

}).listen(9090);






//-------------------server side

//index.html
//video_streaming_server
//--display html page content
//--attach logic for handling src="/movies/video1.mp4" request

//-------------------client side

//No idea