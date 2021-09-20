const express = require('express')
const router = express.Router()
const db = require("./config")

router.get("/", (req, res) => {
    console.log("routing to GET")
    db.getConnection((err, conn) => {
        if (err){
            throw err
        } else {
            res.on('error', (err) => {
                console.error(err)
            }) 
            const getSql = "SELECT q.id, q.question, q.answer, c.choice, c.description\
                            FROM questiont AS q\
                            RIGHT JOIN choicet AS c\
                            ON q.id = c.id_question"
            conn.query(getSql, (err, data) => {
                if (!err) {
                    // console.log(data)
                    res.json(data)
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

router.post("/", (req, res) => {
    console.log("routing to POST")
    let body = ''
    req.on('error', (err) => {
        console.error(err)
    }).on('data', chunk => {
        body += chunk.toString()
    }).on('end', () => {
        const bodyObj = JSON.parse(body)
        // console.log(bodyObj)
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                res.on('error', (err) => {
                console.error(err)
                }) 
                const postSql1 = `INSERT INTO questiont \
                                    (id, question, answer) VALUES (?,?,?)`
                conn.query(postSql1, [ bodyObj.id, bodyObj.question, bodyObj.answer ], (err, data) => {
                    if (err) {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
                for (let i=0; i < bodyObj.choiceDesc.length; i++){
                    if(!bodyObj.choiceDesc[i]) break

                    const postSql2 = `INSERT INTO choicet \
                                        (id_question, choice, description) VALUES (?,?,?)`
                    conn.query(postSql2, [ bodyObj.id, (i+1), bodyObj.choiceDesc[i] ], (err, data) => {
                        if (err) {
                            console.log(`query error : ${err}`)
                            res.send(err)
                        }
                    })
                }
            }
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })
    res.send("POST request processed.")    
})

router.put("/", (req,res) => {
    console.log("routing to PUT")
    let body = ''
    req.on('error', (err) => {
        console.error(err)
    }).on('data', chunk => {
        body += chunk.toString()
    }).on('end', () => {
        const bodyObj = JSON.parse(body)
        console.log(bodyObj)
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                const putSql1 = "UPDATE questiont SET question = ?, answer = ? WHERE id = ?"
                conn.query(putSql1, [ bodyObj.question, bodyObj.answer, bodyObj.id ], (err, data) => {
                    if (err) {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
                for (let i=0; i < bodyObj.choiceDesc.length; i++){
                    const putSql2 = "UPDATE choicet SET description = ? WHERE id_question = ? AND choice = ?";    
                    conn.query(putSql2, [ bodyObj.choiceDesc[i], bodyObj.id, (i+1) ], function (err, data) {
                        if (err) {
                            console.log(`query error : ${err}`)
                            res.send(err)
                        }
                    }); 
                }
            }
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })
    res.send("PUT request processed.") 
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