'use strict';
let http = require('http');
const url = require("url");
const manipulateDB = require("./manipulateDB");

const endPointRoot = "/projects/01/API/v1/";

http.createServer(function (req, res){
    const query = url.parse(req.url, true);

    res.writeHead(200, {
        'Content-type': 'text/plain; charset=utf-8', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    });

    if (req.method === "GET" && query.pathname === endPointRoot + "questions"){
        console.log("get got");
        manipulateDB.readQuestions(req,res);
    } else if (req.method ==="POST" && query.pathname === endPointRoot + "questions"){
        console.log("post got");
        manipulateDB.createQuestion(req,res);
    } else if ((req.method === "PUT" || req.method === "OPTIONS") && query.pathname === endPointRoot + "put_questions"){
        console.log("put got");
        manipulateDB.updateQuestion(req,res);
    } else if ((req.method === "DELETE" || req.method === "OPTIONS") && query.pathname === endPointRoot + "del_questions"){
        manipulateDB.deleteQuestion(req,res);
    } 
}).listen();
