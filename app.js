var express = require("express");

var app = express();


// checks to if server is listening to requests
 app.listen(process.env.PORT || 3000, function () {
   
   console.log("And we're rollin'");
 });
