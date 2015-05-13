// Dependencies
var Diable = require("../lib")
  , Assert = require("assert")
  ;

// Check if it's a daemon
if (Diable.isDaemon()) {
    return setTimeout(function () {
        console.log("Was alive for 1000ms");
    }, 1000);
}

// Daemonize this process
it("shuould daemonize the process itself", function (cb) {
    var daemon = Diable({ exit: false });
    Assert.equal(typeof daemon.pid, "number");
    cb();
});
