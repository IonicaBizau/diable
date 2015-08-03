## Documentation
You can see below the API reference of this module.

### `Diable(path, exec, options)`
Daemonizes processes, the current process being the default target (unless
a different path is provided).

Usage:

```js
// Daemonizes the current process
Diable();

// Daemonizes the current process by adding the '--foo bar' cli arguments.
Diable({
  args: {
     "foo": "bar"
  }
});

// Daemonizes a provided path
Diable("path/to/some/script.js", {
  // some options
});

// Daemonizes a provided path
Diable("path/to/some/script.js", {
  // some options
});

// Daemonizes a different process handling the stdio streams
Diable("", "some-command", {
   stdio: [stdin, stdout, stderr]
});
```

#### Params
- **String** `path`: The path to the script to daemonize (default: the current process path).
- **String** `exec`: The executable to run (default: `process.execPath`).
- **Object** `options`: An object which will be passed to the `exec` function. It is extended with:
 - `force` (Boolean): A flag to force daemonizing even the process is a daemon already (default: `false`).
 - `exit` (Boolean): A flag to control the process exit (default: `true`).
 - `args` (Array): An array with the additional cli arguments.

#### Return
- **Null|Proc** `null` if the process was not daemonized, the daemon process otherwise. A daemon cannot be daemonized by itself unless `options.force` is true.

### `isDaemon()`
Checks if the current process is a daemon started by `diable`.

#### Return
- **Boolean** `true` if the process is a daemon, `false` otherwise.

### `daemonize(app, args, options)`
Low level for daemonizing the things. It's used internally.
Also, it can be useful in specific cases.

#### Params
- **String** `app`: The executable application.
- **Array** `args`: The spawn arguments (default: `[]`).
- **Object** `options`: The object passed to the `spawn` function (default: `{}`).

#### Return
- **Process** The daemon process.

