const mysql = require('mysql');

const connect =mysql.createConnection({
                        host: '127.0.0.1', // Use the IP address or hostname of your MySQL server
                        user: 'root',      // Use your MySQL username (which appears to be 'root')
                        password: '',      // Use your MySQL password (if set)
                        database: 'ecommerce_app', // Use the name of your MySQL database
          });


module.exports = {connect}
  