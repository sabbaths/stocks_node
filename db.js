const mysql = require('mysql');

var connection;

module.exports = {

    dbConnection: function () {

        connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          port: "8889",
          database: "stocks",
        });

        connection.connect();

        return connection;
    },
    dbQuery: function() {
        connection.query("SELECT username,password FROM users", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    },
    login: function(username, password, res) {
      console.log(username);

      connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password],function (err, result) {
          
          if (err) 
            throw err;
          console.log(result);   
          //return result;
          res.send(JSON.stringify(result))
      });
    },
    register: function() {

    }
};