var express = require("express");

var app = express();

app.get('/', function (req, res) {
  res.render('site/home.ejs')
});
// checks to if server is listening to requests
 app.listen(process.env.PORT || 3000, function () {
   
   console.log("And we're rollin'");
 });
