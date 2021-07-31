const mysql = require('mysql')

var connection = mysql.createConnection({
    local: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tripckets'
});

connection.connect((err, result) => {
    if(err) throw err;
    console.log('MySQL connected')
});

module.exports = connection;