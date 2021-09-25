'use strict'
import { Router } from "express";
import db from "./config";

const router = Router();

router.get("/", (req, res) => {
    console.log("routing to GET");
    db.getConnection((err, conn) => {
        if (err){
            throw err;
        } else {
            res.on('error', (err) => {
                console.error(err);
            }) 
            const getSql = "SELECT q.id, q.question, q.answer, c.choice, c.description\
                            FROM questiont AS q\
                            RIGHT JOIN choicet AS c\
                            ON q.id = c.id_question";
            conn.query(getSql, (err, data) => {
                if (!err) {
                    // console.log(data);
                    res.json(data);
                } else {
                    console.log(`query error : ${err}`);
                    res.send(err);
                };
            });
        };
        conn.release(err => {
            if (err) throw err
            console.log('Closed database connection.');
        });
    });   
});

router.post("/", (req, res) => {
    console.log("routing to POST");
    let body = '';
    req.on('error', (err) => {
        console.error(err);
    }).on('data', chunk => {
        body += chunk.toString();
    }).on('end', () => {
        const bodyObj = JSON.parse(body);
        // console.log(bodyObj);
        db.getConnection((err, conn) => {
            if (err){
                throw err;
            } else {
                res.on('error', (err) => {
                console.error(err);
                });
                const postSql1 = `INSERT INTO questiont \
                                    (id, question, answer) VALUES (?,?,?)`;
                conn.query(postSql1, [ bodyObj.id, bodyObj.question, bodyObj.answer ], (err, data) => {
                    if (err) {
                        console.log(`query error : ${err}`);
                        res.send(err);
                    };
                });
                for (let i=0; i < bodyObj.choiceDesc.length; i++){
                    if(!bodyObj.choiceDesc[i]) break;

                    const postSql2 = `INSERT INTO choicet \
                                        (id_question, choice, description) VALUES (?,?,?)`;
                    conn.query(postSql2, [ bodyObj.id, (i+1), bodyObj.choiceDesc[i] ], (err, data) => {
                        if (err) {
                            console.log(`query error : ${err}`);
                            res.send(err);
                        };
                    });
                };
            };
            conn.release(err => {
                if (err) throw err;
                console.log('Closed database connection.');
            });
        });
    });
    res.end("POST request processed.");  
});

router.put("/", (req,res) => {
    console.log("routing to PUT");
    let body = '';
    req.on('error', (err) => {
        console.error(err);
    }).on('data', chunk => {
        body += chunk.toString();
    }).on('end', () => {
        const bodyObj = JSON.parse(body);
        // console.log(bodyObj);
        db.getConnection((err, conn) => {
            if (err){
                throw err;
            } else {
                const putSql1 = "UPDATE questiont SET question = ?, answer = ? WHERE id = ?";
                conn.query(putSql1, [ bodyObj.question, bodyObj.answer, bodyObj.id ], (err, data) => {
                    if (err) {
                        console.log(`query error : ${err}`);
                        res.send(err);
                    };
                })
                for (let i=0; i < bodyObj.choiceDesc.length; i++){
                    const putSql2 = "UPDATE choicet SET description = ? WHERE id_question = ? AND choice = ?";    
                    conn.query(putSql2, [ bodyObj.choiceDesc[i], bodyObj.id, (i+1) ], function (err, data) {
                        if (err) {
                            console.log(`query error : ${err}`);
                            res.send(err);
                        };
                    }); 
                };
            };
            conn.release(err => {
                if (err) throw err;
                console.log('Closed database connection.');
            });
        });
    });
    res.end("PUT request processed."); 
});

router.delete("/", (req,res) => {
    console.log("routing to DELETE");
    let deleteId = '';
    req.on('error', (err) => {
        console.error(err);
    }).on('data', chunk => {
        deleteId += chunk.toString();
    }).on('end', () => {
        db.getConnection((err, conn) => {
            if (err){
                throw err;
            } else {
                const deleteSql1 = "DELETE FROM choicet WHERE id_question = ?";
                conn.query(deleteSql1, [ deleteId ], (err, data) => {
                    if (err) {
                        console.log(`query error : ${err}`);
                        res.send(err);
                    };
                });
                const deleteSql2 = "DELETE FROM questiont WHERE id = ?";    
                conn.query(deleteSql2, [ deleteId ], function (err, data) {
                    if (err) {
                        console.log(`query error : ${err}`);
                        res.send(err);
                    };
                });
            };
            conn.release(err => {
                if (err) throw err;
                console.log('Closed database connection.');
            });
        });
    });
    res.end("DELETE request processed.");   
});
export default router;