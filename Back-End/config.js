const mysql = require('mysql');

module.exports = {
    getConnection : mysql.createConnection({
        host: "localhost",
        user: "lucaswgo_root",
        password: "GUA1GW82hPCD",
        database: "lucaswgo_project01"//
    })
}

