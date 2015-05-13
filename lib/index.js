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
      , env: {
            __is_daemon: true
        }
    });

    // Stringify the arguments
    if (typeof options.args === "object") {
        options.args = OArgv(options.args);
    }

    // Build the command to run
    var command = [exec, path, options.args].join(" ").trim();
    delete options.args;

    Diable.daemonize(command, options);

    if (path === process.argv[1]) {
        process.exit();
    }
}

Diable.daemonize = function (command, options) {
    options = options || {};
    var proc = Exec(command, options);
    proc.unref();
    return proc;
};

Diable.isDaemon = function () {
    return process.env.__is_daemon ? true : false;
};

module.exports = Diable;
