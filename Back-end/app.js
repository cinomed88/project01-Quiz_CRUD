// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();

let http = require('http');
const url = require("url")
const manipulateDB = require("./manipulateDB")

const endPointRoot = "/COMP4537/individual/API/v1/";
// const port = 8080;

http.createServer(function (req, res){
    const query = url.parse(req.url, true);

    res.writeHead(200, {
        'Content-type': 'text/plain; charset=utf-8', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    });
    if (req.method === "GET" && query.pathname === endPointRoot + "questions"){
        console.log("get got");
        manipulateDB.readQuestions(req,res);
    } else if (req.method ==="POST" && query.pathname === endPointRoot + "questions"){
        console.log("post got");
        manipulateDB.createQuestion(req,res);
    } else if((req.method === "PUT" || req.method === "OPTIONS")&& query.pathname === endPointRoot + "questions"){
        console.log("put got");
        manipulateDB.updateQuestion(query,req,res);
    } else if(req.method === "DELETE" && query.pathname === endPointRoot + "questions"){
        manipulateDB.deleteQuestion(query,req,res);
    }
}).listen();
// console.log('listening on port: '+port);

