const express = require('express')
const router = express.Router()
const db = require("./config")

router.get("/", async (req, res) => {
    console.log("routing to GET")
    db.getConnection((err, conn) => {
        if (err){
            throw err
        } else {
            const getSql = "SELECT q.id, q.question, q.answer, c.choice, c.description\
                            FROM questiont AS q\
                            RIGHT JOIN choicet AS c\
                            ON q.id = c.id_question"
            conn.query(getSql, (err, rows) => {
                if (!err) {
                    console.log(rows)
                    res.send(rows)
                } else {
                    res.send(err)
                }
            })
        }
        conn.release(err => {
            if (err) throw err
            console.log('Closed database connection.')
        })
    })    
})

router.post("/", async (req,res) => {
    console.log("routing to POST")
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const bodyObj = JSON.parse(body)
        console.log(bodyObj)
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                const postSql = `INSERT INTO twits (id, name, time, text) VALUES (?,?,?,?)`
                conn.query(postSql, [bodyObj.id, bodyObj.name, bodyObj.time, bodyObj.text], (err, rows) => {
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
            }
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })

})

router.put("/", (req,res) => {
    console.log("routing to PUT")
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const bodyObj = JSON.parse(body)
        console.log(bodyObj)
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                const putSql = "UPDATE twits SET name = ?, time = ?, text = ? WHERE id = ?"
                conn.query(putSql, [bodyObj.name, bodyObj.time, bodyObj.text, bodyObj.id], (err, rows) => {
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
            }
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })
})

router.delete("/", (req,res) => {
    console.log("routing to DELETE")
    let deleteId = ''
    req.on('data', chunk => {
        deleteId += chunk.toString()
    })
    req.on('end', () => {
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                const deleteSql = "DELETE FROM twits WHERE id = ?"
                conn.query(deleteSql, [ deleteId ], (err, rows) => {
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
            }
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })    
})
module.exports = router

// http.createServer(function (req, res){
//     const query = url.parse(req.url, true);

//     res.writeHead(200, {
//         'Content-type': 'text/plain; charset=utf-8', 
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
//     });

//     if (req.method === "GET" && query.pathname === endPointRoot + "questions"){
//         console.log("get got");
//         manipulateDB.readQuestions(req,res);
//     } else if (req.method ==="POST" && query.pathname === endPointRoot + "questions"){
//         console.log("post got");
//         manipulateDB.createQuestion(req,res);
//     } else if ((req.method === "PUT" || req.method === "OPTIONS") && query.pathname === endPointRoot + "put_questions"){
//         console.log("put got");
//         manipulateDB.updateQuestion(req,res);
//     } else if ((req.method === "DELETE" || req.method === "OPTIONS") && query.pathname === endPointRoot + "del_questions"){
//         manipulateDB.deleteQuestion(req,res);
//     } 
// }).listen();