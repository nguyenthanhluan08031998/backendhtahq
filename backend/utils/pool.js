const mysql = require('mysql')

module.exports = mysql.createPool({
    connectionLimit: 100,
    host: 'remotemysql.com',
    port: 3306,
    user: 'lHgt1Ac0iy',
    password: 'lEkkwhy0Dd',
    database: 'lHgt1Ac0iy'
})