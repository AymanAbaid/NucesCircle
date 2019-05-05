var http=require('http');//core module of js ; automatically loaded by node js 
var module1=require('./module1');
var fs = require('fs');

http.createServer(module1.handleRequest).listen(8000);

