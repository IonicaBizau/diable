// Dependencies
var Diable = require("../lib");

// Enter in ethernal sleep only when this very process is a daemon
if (Diable.isDaemon()) {
    console.log("Daemonizing `sleep 5`.");
    Diable("echo 'I need to be resurrected'", "sleep 5;", {
        ethernal: true
      , stdio: ["ignore", process.stdout]
    });
}

console.log("Creating a daemon.");
Diable({
      exit: false
    , stdio: ["ignore", process.stdout]
});
