// Dependencies
var Diable = require("../lib");

// Do the stuff
console.log("Daemonizing this process.");
Diable(function (err) {
    console.log(err || "Do `ps aux | grep node` and see the daemons.");
});
