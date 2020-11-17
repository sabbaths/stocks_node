var mysql = require('mysql'); 


module.exports =  function() {

	con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  port: "8889",
	  database: "stocks",
	});

	connect = this.con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});

	query = this.con.query("SELECT username,password FROM users", function (err, result) {
		if (err) throw err;
		console.log(result);
		wow();
	});

	this.test = function() {
		console.log('none');
	}

	function wow() {
		console.log('wow');
	}

}
//db.test();

