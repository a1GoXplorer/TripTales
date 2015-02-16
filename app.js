/*DEPENDENCIES*/

/*app routing*/
var express = require("express");

/*embedded javascript*/
var ejs = require("ejs");

/*JSON parser*/
var bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}))

// app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

/*postgresql database*/
var pg = require("pg");

/*Object Relational Mapper*/
var sequelize = require("sequelize");

/*application init*/
var app = express();

/*root path*/
app.get('/', function (req, res) {
  res.render('site/home.ejs')
});
// checks to if server is listening to requests
 app.listen(process.env.PORT || 3000, function () {
   
   console.log("And we're rollin'");
 });
