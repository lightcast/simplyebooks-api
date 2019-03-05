let mysql = require('mysql');

let prodConnection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

let localConnection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

let devConnection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});


//test


let pool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});

let prodPool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});


let devPool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});


let prodSeverAddress = '';
let localServerAddress = "http://localhost:9001";
let devServerAddress = "";


console.log('process.env.NODE_ENV = ', process.env.NODE_ENV)

if (process.env.NODE_ENV == 'production') {
  exports.connection = prodConnection;
  exports.mysqlConnection = prodConnection;
  exports.serverAddress = prodSeverAddress;
  exports.pool = prodPool;
} else if (process.env.NODE_ENV == 'dev') {
  exports.connection = devConnection;
  exports.mysqlConnection = devConnection;
  exports.serverAddress = devServerAddress;
  exports.pool = devPool;
} else {
  exports.connection = localConnection;
  exports.mysqlConnection = localConnection;
  exports.serverAddress = localServerAddress;
  exports.pool = pool;
}


exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL ||
                      'mongodb://localhost/simplybooks';

exports.PORT = process.env.PORT || 80;
