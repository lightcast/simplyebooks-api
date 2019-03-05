const express = require('express');
require('dotenv').config()
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const session = require('express-session');
const helmet = require('helmet')
const bcrypt = require('bcryptjs');
const fs = require('fs');


const jsonParser = bodyParser.json();
const app = express();

const {
  PORT,
  DATABASE_URL
} = require('./server/config');
const {
  pool,
  serverAddress,
  mysqlConnection
} = require('./server/config');


// routes
const index = require('./server/router/index');


// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;


app.use(helmet())

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-File-Name,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// log the http layer
app.use(morgan('common'));

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}))

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.status(404).json({data: "Route not found", success: false});
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      data: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    data: err.message,
    error: {}
  });
});

var runServer = function(cb) {
  mongoose.connect(DATABASE_URL, function(err){
    if(err && cb){
      return cb(err);
    }
    app.listen(PORT, function(){
      console.log('Listening on PORT:', PORT);
      if(cb){
        cb();
      }
    })
  })
}


if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.log(err);
    }
  })
}


  /*
  // we run the app on port 80 and 443 if we are in PROD
  if (process.env.NODE_ENV == 'production') {
    const http = require('https');
    const sslPath = '/home/ec2-user/ssl-cert/';
    // const options = {
    //   key: fs.readFileSync(sslPath + 'privkey.pem'),
    //   cert: fs.readFileSync(sslPath + 'fullchain.pem')
    // };
    /*

    const options = {
      key: fs.readFileSync(sslPath + 'cert.key'),
      cert: fs.readFileSync(sslPath + 'ssl_certificate.cer'),
      ca: fs.readFileSync(sslPath + 'IntermediateCA.cer')
    };
    this.server = http.createServer(options,app);
    this.io = require('socket.io').listen(this.server);
    this.server.listen(8443);
}*/



// exports.app = app;
// exports.runServer = runServer;
//



module.exports = app;
