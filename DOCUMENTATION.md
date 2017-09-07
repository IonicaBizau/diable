## Documentation

You can see below the API reference of this module.

### `Diable(opts)`
Daemonizes processes the current process.

#### Params

- **Object** `opts`: An object which will be passed to the `exec` function. It is extended with:
 - `env` (Object): The environment object (default: `process.env`).

#### Return
- **Number|Process** `false` if the process was already daemonized. Otherwise the process is closed anyways.

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
- **Object** `options`: The object passed to the `spawn` function (default: `{}`) extended with:
 - `command` (String): The command to use. By default, the Node.js path.

#### Return
- **Process** The daemon process.

