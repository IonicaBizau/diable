// Dependencies
var ChildProcess = require("child_process")
  , Exec = ChildProcess.exec
  , Ul = require("ul")
  ;

function Diable(path, exec, options) {

    // Diable(options);
    if (typeof path === "object") {
        options = path;
        path = null;
    // Diable(path, options);
    } else if (typeof exec === "object") {
        options = exec;
        exec = null;
    }

    // Check if the process is already a daemon
    if (!path && process.env.__is_daemon) {
        return null;
    }

    // Get the script path
    path = path || process.argv[1];

    // Get the exec path
    exec = exec || process.execPath;

    // Merge the options
    options = Ul.merge(options, {
        args: ""
      , detached: true
      , cwd: process.cwd()
    });

    // Stringify the arguments
    if (typeof options.args === "object") {
        options.args = OArgv(options.args);
    }

    // Build the command to run
    var command = [exec, path, options.args].join(" ").trim();
    delete options.args;

    return Diable.daemonize(command, options);
}

Diable.daemonize = function (command, options) {
    console.error(command);
    options = options || {};
    var proc = Exec(command, options);
    proc.on("error", function (err) {
        console.error(err);
    });
    proc.unref();
    debugger
    return proc;
};

module.exports = Diable;
