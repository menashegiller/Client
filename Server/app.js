var express = require('express');
var path = require('path');
cookieParser = require('cookie-parser');
session = require('express-session');

var favicon = require('serve-favicon');
var logger = require('morgan');

bodyParser = require('body-parser');

//var cookieSession = require('cookie-session')

requestIp = require('request-ip');

jwt = require('jsonwebtoken');
cors = require('cors');

config = require('./config');

superSecret = config.secret;
https = require('https');
qs = require('querystring');
fs = require('fs');

request = require('request');
var firefox = require('node-firefox');
sql=require('mssql');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

DBConnectionString  = config.ConnectionString;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.use(express.static(__dirname +  '/build'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

// Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization');

    
    

    // Pass to next layer of middleware
    next();
});
app.use('/public',express.static(__dirname +  '/public'));

//app.use(express.cookieParser('S3CRE7'));

app.use(session({
    secret:'&*^*&#$^7sdsdf443%#$%#$FSD',
    resave: false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}))

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(5002, function () {
  console.log('Example app listening on port 5002!');
});

//app.use(express.static('../../Scholarships/Client/src/app'));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
