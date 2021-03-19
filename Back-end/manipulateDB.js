const mysql = require("mysql")
const config = require('./config');
const { parse } = require('querystring');
/////////////////////////////////////////////
var conn = config.getConnection;
conn.connect((err) => {
    if (err) {throw err;}
    console.log('Connected to database');
});
///////////////////////////////////////////

const readQuestions = (req, res) => {
    let sql1 = 'SELECT * FROM questiont';    
    conn.query(sql1, function (err1, rows1, fields1) {
        if (err1) {
            console.log('query is not excuted. select fail...\n' + err1);
        }
        // console.log(rows1)
        res.write(JSON.stringify({rows1})+'\n///\n');

    });
    
    let sql2 = 'SELECT * FROM choicet';    
    conn.query(sql2, function (err2, rows2, fields2) {
        if (err2) {
            console.log('query is not excuted. select fail...\n' + err2);
        }      
        // console.log(rows2)
        res.write(JSON.stringify({rows2}));
        res.end();
    });
}

const createQuestion = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        let bodyObj = JSON.parse(parse(body).data);

        let sql1 = "INSERT INTO questiont (id,question,answer) VALUES (?,?,?)";    
        conn.query(sql1, [ bodyObj.questionNumber, bodyObj.question, bodyObj.correctAnswer], function (err1, rows1, fields1) {
            if (err1) {
                console.log('query is not excuted. select fail...\n' + err1);
            }
        });
        for (let i=0; i < 4; i++){
            if(bodyObj.answers[i].length == 0){
                break;
            }
            var sql2 = "INSERT INTO choicet (choice, description, id_question) VALUES (?,?,?)";    
            conn.query(sql2, [ (i+1), bodyObj.answers[i], bodyObj.questionNumber ], function (err2, rows2, fields2) {
                if (err2) {
                    console.log('query is not excuted. select fail...\n' + err2);
                }
            });
        }
        console.log(bodyObj);
        res.end('db post ok');
    });
}
const updateQuestion = (query, req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        let bodyStr = parse(body).data;
        if(bodyStr){
            console.log(bodyStr);
            let bodyObj = JSON.parse(bodyStr)
            console.log(bodyObj)
            let sql1 = "UPDATE questiont SET question = ?, answer = ? WHERE id = ?";    
            conn.query(sql1, [ bodyObj.question, bodyObj.correctAnswer, bodyObj.questionNumber], function (err1, rows1, fields1) {
                if (err1) {
                    console.log('query is not excuted. select fail...\n' + err1);
                }
            });
            for (let i=0; i < bodyObj.answers.length; i++){
                var sql2 = "UPDATE choicet SET description = ? WHERE id_question = ? AND choice = ?";    
                conn.query(sql2, [ bodyObj.answers[i], bodyObj.questionNumber, (i+1) ], function (err2, rows2, fields2) {
                    if (err2) {
                        console.log('query is not excuted. select fail...\n' + err2);
                    }
                });
            }    
        }
    
        res.end('db put ok');
    });
}
// const deleteQuestion = (query, req, res) => {
//     var sql2 = 'DELETE FROM choices WHERE id_question IN (SELECT MAX(id_question) FROM choices)';    
//     conn.query(sql2, function (err2, rows2, fields2) {
//         if (err2) {
//             console.log('query is not excuted. select fail...\n' + err);
//         }
//         res.write("last choices are deleted");
//     });

//     var sql1 = 'DELETE FROM questions WHERE id IN (SELECT MAX(id) FROM questions)';    
//     conn.query(sql1, function (err1, rows1, fields1) {
//         if (err1) {
//             console.log('query is not excuted. select fail...\n' + err);
//         }
//         res.write("last question is deleted");   
//         res.end();   
//     });
// }

module.exports.readQuestions = readQuestions
module.exports.createQuestion = createQuestion
module.exports.updateQuestion = updateQuestion
// module.exports.deleteQuestion = deleteQuestion