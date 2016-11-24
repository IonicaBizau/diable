// Dependencies
var Diable = require("../lib")
  , Http = require("http")
  , Fs = require("fs")
  ;

// Create the daemon
Diable();

// This is run only when the process is a daemon
Http.createServer(function (req, res) {
    Fs.writeFileSync("foo", req.url);
    res.end("Hello World " + process.argv[2]);
}).listen(9000);
