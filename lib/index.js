// Dependencies
var ChildProcess = require("child_process")
  , Spawn = ChildProcess.spawn
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
    });

    // Stringify the arguments
    if (typeof options.args === "object") {
        options.args = OArgv(options.args);
    }

    // Build the command to run
    var command = [exec, options.args].join(" ");
    delete options.args;

    return Diable.daemonize(command, [], options);
}

Diable.daemonize = function (command, args, options) {
    args = args || [];
    options = options || {};
    var proc = Spawn(command, args, options);
    proc.unref();
    return proc;
};
