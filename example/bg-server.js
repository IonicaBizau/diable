const Diable = require("../lib")
    , http = require("http")
    , fs = require("fs");

// Create the daemon
Diable();

// This is run only when the process is a daemon
http.createServer((req, res) => {
  fs.writeFileSync("foo", req.url);
  res.end("Hello World " + process.argv[2]);
}).listen(9000);
