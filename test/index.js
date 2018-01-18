const Diable = require("../lib")
    , Assert = require("assert")

// Check if it's a daemon
if (Diable.isDaemon()) {
    return setTimeout(() => {
        console.log("Was alive for 1000ms");
    }, 1000);
} else {
    // Daemonize this process
    it("shuould daemonize the process itself", cb => {
        const daemon = Diable({ exit: false })
        Assert.equal(typeof daemon.pid, "number")
        cb()
    })
}
