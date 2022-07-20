// server.js
const https = require('https');
const fs = require('fs');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./build");

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = function (req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
}

https.createServer(options, app).listen(8899);
