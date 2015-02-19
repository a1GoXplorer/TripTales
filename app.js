/*DEPENDENCIES*/

/*app routing*/
var express = require("express");

/*embedded javascript*/
var ejs = require("ejs");

/*file path*/
var path = require('path');

/*file system*/
var fs = ('fs');

/*dependencies for signup/login/sessions*/
var bcrypt = require('bcrypt');
  var session = require('cookie-session');
 var cookieParser = require('cookie-parser');
 var passport = require('passport');
  var passportLocal = require('passport-local');

/*testing framework*/
  var mocha = require('mocha');

/*file upload*/
var multer = require('multer');

/*JSON parser*/
var bodyParser = require("body-parser");

// Instantiate express
var app = express();

var done=false;


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser({uploadDir: '/uploads'}));


// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

/*postgresql database*/
var pg = require("pg");
var db = require('./models/');

/*Object Relational Mapper*/
var sequelize = require("sequelize");

// END DEPENDENCIES
// START APPLICATION

/*application init*/

app.set('view engine', 'ejs');

app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  // this is in milliseconds
  maxage: 3600000
  })
);

// get passport started
app.use(passport.initialize());
app.use(passport.session());

/*
SERIALizING
Turns relevant user data into a string to be 
  stored as a cookie
*/
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");

  done(null, user.id);
});

/*
DeSERIALizing
Taking a string and turns into an object
  using the relevant data stored in the session
*/
passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
      where: {
        id: id
      }
    })
    .then(function(user){
      done(null, user);
    },
    function(err) {
      done(err, null);
    });
});

app.set("view engine", "ejs");


/*root path*/
app.get('/', function (req, res) {
    res.render('site/home');
});

//sign-up
app.get('/signup', function (req, res) {
  res.render('site/signup');
});

//map page
app.get('/map', function (req, res) {
  res.render('site/map');
});


/* Configure the multer */

app.use(multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
 onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
 onFileUploadComplete: function (file) {
     console.log(file.fieldname + ' uploaded to ' + file.path)
     done=true;
   }
   }));

/* routes for upload */

 // app.get('/', function(req, res) {
 //     res.sendFile("/site/profile");
 // });

 app.post('/', function(req, res) {
  if(done==true){
    
    res.end("File uploaded");
    res.redirect('/')
  }
 });

 app.get('/users/:id', function (req, res) {
     res.render('site/home');
 });

 app.post('/profile', function(req, res) {
    
    console.log("\n\n\n\n\n\n"+req.files.userPhoto.path);
 });

//posts new user info
app.post('/signup', function (req, res) {
  var userObj = req.body.user;
  // console.log("req:", req);
  // console.log("res:", res);
  console.log("body:", req.body);
  db.User.createSecure(userObj.email, userObj.password,
    function(err,user,msg) {
      console.log("ERROR:", err);
      console.log("user:", user);
      console.log("msg:", msg.message);
     // res.redirect('/');
     res.send('ERROR');
    },
    function(err, user, msg){
      //res.send("Other");
      res.redirect('/users/' + user.id);
    });
    //console.log(req.body);
    //res.redirect('/');
});

//log-in
app.get('/login', function (req, res) {
  res.render('site/login')
})

// Authenticating a user
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/*upload files
app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
            res.redirect("/profile")
        });

    } else {
        fs.unlink(tempPath, function () {
            // if (err) throw err;
            res.redirect("/");
            console.error("Only .png files are allowed!");
        });

    }
}); */

//view files
app.get('/image.png', function (req, res) {
    res.sendFile(path.resolve('./uploads/image.png'));
}); 

//about
app.get('/about', function (req, res) {
  res.render('site/about');
})


// checks to if server is listening to requests
 app.listen(process.env.PORT || 3000, function () {
   
   console.log("And we're rollin'");
 });
