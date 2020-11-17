var express = require('express');
var app = express();
var fs = require("fs");
var database = require('./database');
var db = require('./db');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/users/', function (req, res) {
   res.send('GET request to the homepage')
})

app.post('/api/users/login', function (req, res) {
   //res.send(req.query.username);


   console.log("REQUEST BODY");
   console.log(req.body);

   var username = req.body.username;
   var password = req.body.password;

   db.dbConnection();
   var user = db.login(username, password , res);

   /*var json_result = {
      "status_id": 0,
      "user_id": 1,
   } */
   console.log("user: " + user);
   
   //res.send(JSON.stringify(json_result))
})

app.post('/api/users/register', function (req, res) {
   res.send('GET request to the homepage')
})

app.get('/api/', function (req, res) {
   res.send('GET request to the homepage')
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/db', function (req, res) {
   // First read existing users.
   console.log("db");
   res.end( JSON.stringify({"wow":"wow"}));
   db.dbConnection();
   db.dbQuery();
})

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})



app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

