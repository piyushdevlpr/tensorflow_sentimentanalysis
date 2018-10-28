var express     = require("express"),
    app         = express(),
    server= require("http").createServer(app),
    io = require("socket.io").listen(server)
    path = require("path")

    var fs = require('fs');
fs.readFile( __dirname + '/dict.csv', function (err, data) {
  if (err) {
    throw err; 
  }
  io.sockets.on("connection",function(socket){
    io.emit("csvfile",data.toString()) ;
  });
 // console.log(data.toString());
});
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/",function(req,res,next){
    res.sendFile(path.join(__dirname+'/sent_web.html')); 
    //res.render("sent_web.html") ;
});
var port = process.env.PORT || 3000;
server.listen(port,function(){
  console.log("server running!!!!");
});