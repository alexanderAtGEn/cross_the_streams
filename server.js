#!/usr/bin/env node
var http = require('http');
var net = require('net');
var url = require('url');
var crypto = require('crypto');



http.createServer(function (req, res) {
    var buf = new Buffer(0);
    var hash = crypto.createHash('sha1');

    if (req.method == 'POST') {
	req.on('data', function(chunk) {
	    buf = Buffer.concat([buf, chunk]);
	});
    
	req.on('end', function() {
	    hash.update(buf);
	    console.log("shadow server 503ing POST: " + hash.digest("hex") + "[" + buf.length + "]");
	    res.writeHead(503, {'Content-Type': 'text/plain'});
	    res.end();
	});
    } else {
	console.log("shadow server got request, but it's not a post, 503ing it.");
	res.writeHead(503, {'Content-Type': 'text/plain'});
	res.end();
    }
}).listen(8001, '127.0.0.1');

[8002, 8003, 8004, 8005].forEach(function (port) {
    http.createServer(function (req, res) {
	console.log("server " + port + " got request, 200ing it.");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
    }).listen(port, '127.0.0.1');
});
console.log("goliath, online!");
