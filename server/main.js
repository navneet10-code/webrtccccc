const config = require('../config.json');
const server = require('./lib/server');



var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");
app.set('views', __dirname + '/views') ;
app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );
app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/client'));  
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});





//config.PORT = process.env.PORT || config.PORT;

//server.run(config);
