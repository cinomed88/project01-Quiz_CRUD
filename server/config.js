const mysql = require('mysql')

const pool = mysql.createPool({
    host: "127.0.0.1",//"localhost",
    user: "root", //"lucaswgo_root"
    password: "1234", //"-1++5sDuPUf$"
    database: "isa_indiv",
    connectionLimit: "10"
})

module.exports = pool