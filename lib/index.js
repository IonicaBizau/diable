// Dependencies
var ChildProcess = require("child_process")
  , Exec = ChildProcess.exec
  , Ul = require("ul")
  ;

/**
 * Diable
 * Daemonizes processes, the current process being the default target (unless
 * a different path is provided).
 *
 * Usage:
 *
 * ```js
 * // Daemonizes the current process
 * Diable();
 *
 * // Daemonizes the current process by adding the '--foo bar' cli arguments.
 * Diable({
 *   args: {
 *      "foo": "bar"
 *   }
 * });
 *
 * // Daemonizes a provided path
 * Diable("path/to/some/script.js", {
 *   // some options
 * });
 *
 * // Daemonizes a provided path
 * Diable("path/to/some/script.js", {
 *   // some options
 * });
 *
 * // Daemonizes a different process handling the stdio streams
 * Diable("", "some-command", {
 *    stdio: [stdin, stdout, stderr]
 * });
 * ```
 *
 * @name Diable
 * @function
 * @param {String} path The path to the script to daemonize (default: the current process path).
 * @param {String} exec The executable to run (default: `process.execPath`).
 * @param {Object} options An object which will be passed to the `exec` function. It is extended with:
 *  - `force` (Boolean): A flag to force daemonizing even the process is a daemon already (default: `false`).
 *  - `exit` (Boolean): A flag to control the process exit (default: `true`).
 * @return {null|undefined} null if the process was not daemonized, otherwise `undefined`. A daemon cannot be daemonized by itself unless `options.force` is true.
 */
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

    // Get the script path
    path = typeof path === "string" ? path : process.argv[1];

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

    // Check if the process is already a daemon
    if (options.force && path === process.argv[1] && Diable.isDaemon()) {
        return null;
    }

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

/**
 * daemonize
 * Low level for daemonizing the things. It's used internally.
 * Also, it can be useful in specific cases.
 *
 * @name daemonize
 * @function
 * @param {String} command The command to run and daemonize.
 * @param {Object} options The object passed to the `exec` function.
 * @return {Process} The daemon process.
 */
Diable.daemonize = function (command, options) {
    var proc = Exec(command, options);
    proc.unref();
    return proc;
};

/**
 * isDaemon
 * Checks if the current process is a daemon started by `diable`.
 *
 * @name isDaemon
 * @function
 * @return {Boolean} `true` if the process is a daemon, `false` otherwise.
 */
Diable.isDaemon = function () {
    return process.env.__is_daemon ? true : false;
};

module.exports = Diable;
