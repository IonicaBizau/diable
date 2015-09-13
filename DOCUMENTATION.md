## Documentation
You can see below the API reference of this module.

### `Diable(path, exec, options)`
Daemonizes processes, the current process being the default target (unless
a different path is provided).

Usage:

```js
// Daemonizes the current process
Diable();

// Daemonizes the current process with additional options
Diable("path/to/some/script.js", {
   args: ["some", "additional", "arguments"]
});

// Daemonizes a provided path
Diable("path/to/some/script.js", {
  // some options
});

// Daemonizes a different process handling the stdio streams
Diable("", "some-command", {
    stdout: process.stdout
  , exit: false
});
```

#### Params
- **String** `path`: The path to the script to daemonize (default: the current process path).
- **String** `exec`: The executable to run (default: `process.execPath`).
- **Object** `options`: An object which will be passed to the `exec` function. It is extended with:
 - `exit` (Boolean): A flag to control the process exit. If `false`, the parent process will not be closed.
 - `args` (Array): An array with the additional cli arguments.
 - `stdout` (Stream): The stdout stream (default: `"ignore"`).
 - `stderr` (Stream): The stderr stream (default: `"ignore"`).
 - `env` (Object): The environment object (default: `process.env`).
 - `cwd` (String): The working directory path (default: `process.cwd`).
 - `force` (Boolean): If `true`, the daemonized process will be able to be daemonized.

#### Return
- **Number|Process** `null` if the process was not daemonized, the daemon process otherwise. A daemon cannot be daemonized by itself unless `options.force` is `true`.

### `isDaemon()`
Checks if the current process is a daemon started by `diable`.

#### Return
- **Boolean** `true` if the process is a daemon, `false` otherwise.

### `daemonize(exec, path, args, options)`
Low level for daemonizing the things. It's used internally.
Also, it can be useful in specific cases.

#### Params
- **String** `exec`: The executable application (defaults to the `process.execPath`).
- **String** `path`: An optional node.js file path for convenience. This will be prepended to the `args` array.
- **Array** `args`: The spawn arguments (default: `[]`).
- **Object** `options`: The object passed to the `spawn` function (default: `{}`).

#### Return
- **Process** The daemon process.

