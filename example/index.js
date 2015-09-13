// Dependencies
var Diable = require("../lib");

// Check if we are already a daemon
if (Diable.isDaemon()) {
    setTimeout(function () {
        console.log("I was alive for 10 seconds.");
    }, 10000);
} else {
    console.log("Daemonizing this process. I will be killed, but I have a child which will live 10 seconds. Do `ps aux | grep node` to see it.");
}

// Daemonize this process (only the non-daemons)
Diable();

console.log("I am a daemon.");
