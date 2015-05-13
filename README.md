# diable
For daemonizing the things out.

## Installation
Run the following commands to download and install the application:

```sh
$ git clone git@github.com:IonicaBizau/node-diable.git diable
$ cd diable
$ npm install
```

## Documentation
## `Diable(path, exec, options)`
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

### Params
- **String** `path`: The path to the script to daemonize (default: the current process path).
- **String** `exec`: The executable to run (default: `process.execPath`).
- **Object** `options`: An object which will be passed to the `exec` function. It is extended with:  - `force` (Boolean): A flag to force daemonizing even the process is a daemon already (default: `false`).
 - `exit` (Boolean): A flag to control the process exit (default: `true`).

### Return
- **Null|Undefined** null if the process was not daemonized, otherwise `undefined`. A daemon cannot be daemonized by itself unless `options.force` is true.

## `daemonize(command, options)`
Low level for daemonizing the things. It's used internally.
Also, it can be useful in specific cases.

### Params
- **String** `command`: The command to run and daemonize.
- **Object** `options`: The object passed to the `exec` function.

### Return
- **Process** The daemon process.

## `isDaemon()`
Checks if the current process is a daemon started by `diable`.

### Return
- **Boolean** `true` if the process is a daemon, `false` otherwise.



## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
