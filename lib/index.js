// Dependencies
var procProcess = require("child_process")
  , Spawn = procProcess.spawn
  , Typpy = require("typpy")
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
 * // Daemonizes the current process with additional options
 * Diable("path/to/some/script.js", {
 *    args: ["some", "additional", "arguments"]
 * });
 *
 * // Daemonizes a provided path
 * Diable("path/to/some/script.js", {
 *   // some options
 * });
 *
 * // Daemonizes a different process handling the stdio streams
 * Diable("", "some-command", {
 *     stdout: process.stdout
 *   , exit: false
 * });
 * ```
 *
 * @name Diable
 * @function
 * @param {String} path The path to the script to daemonize (default: the current process path).
 * @param {String} exec The executable to run (default: `process.execPath`).
 * @param {Object} options An object which will be passed to the `exec` function. It is extended with:
 *
 *  - `exit` (Boolean): A flag to control the process exit. If `false`, the parent process will not be closed.
 *  - `args` (Array): An array with the additional cli arguments.
 *  - `stdout` (Stream): The stdout stream (default: `"ignore"`).
 *  - `stderr` (Stream): The stderr stream (default: `"ignore"`).
 *  - `env` (Object): The environment object (default: `process.env`).
 *  - `cwd` (String): The working directory path (default: `process.cwd`).
 *
 * @return {Number|Process} `null` if the process was not daemonized, the daemon process otherwise. A daemon cannot be daemonized by itself unless `options.force` is true.
 */
function Diable(path, exec, options) {

    // The process is a daemon
    if (Diable.isDaemon()) {
        return process.pid;
    }

    // Diable({...})
    if (Typpy(path, Object)) {
        options = exec;
        path = null;
    }

    // Diable("script.js", {...})
    if (Typpy(exec, Object)) {
        options = exec;
        exec = null;
    }

    // Defaults
    options = options || {};
    var args = [].concat(process.argv)
      , proc = null
      , script = null
      ;

    // Concat optional args
    if (Array.isArray(options.args)) {
        args = args.concat(options.args);
    }

    // Prepare data
    args.shift();
    script = path || args.shift();

    // Daemonize the process
    proc = Diable.daemonize(exec || process.execPath, script, args, options);

    // Do not exit
    if (options.exit !== false) {
        process.nextTick(process.exit);
    }

    return proc;
}

/**
 * isDaemon
 * Checks if the current process is a daemon started by `diable`.
 *
 * @name isDaemon
 * @function
 * @return {Boolean} `true` if the process is a daemon, `false` otherwise.
 */
Diable.isDaemon = function () {
    return !!process.env.__is_daemon;
};

/**
 * daemonize
 * Low level for daemonizing the things. It's used internally.
 * Also, it can be useful in specific cases.
 *
 * @name daemonize
 * @function
 * @param {String} app The executable application.
 * @param {Array} args The spawn arguments (default: `[]`).
 * @param {Object} options The object passed to the `spawn` function (default: `{}`).
 * @return {Process} The daemon process.
 */
Diable.daemonize = function (exec, app, args, options) {

    options = options || {};

    var stdout = options.stdout || "ignore"
      , stderr = options.stderr || "ignore"
      , env = options.env || process.env
      , cwd = options.cwd || process.cwd
      , cp_opt = {
            stdio: ["ignore", stdout, stderr]
          , env: env
          , cwd: cwd
          , detached: true
        }
      , proc = null
      ;

    cp_opt.env.__is_daemon = true;

    proc = Spawn(exec, [app].concat(args), cp_opt);
    proc.unref();

    return proc;
};

module.exports = Diable;
