// Dependencies
var Diable = require("../lib");

// Check if we are already a daemon
if (Diable.isDaemon()) {
    return setTimeout(function () {
        console.log("I was alive for 10 seconds.");
    }, 10000);
}

// Do the stuff
console.log("Daemonizing this process.");
Diable();
