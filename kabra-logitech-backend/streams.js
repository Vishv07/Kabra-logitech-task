const fs = require("fs");
const server = require("http").createServer();



server.on("request",(req,res) =>{

    fs.read("demo.txt",(err,data) =>{
            if(err) console.log(err);
            res.end(data);
    });
})


server.listen(3001,function(){
    console.log("Server running");
});