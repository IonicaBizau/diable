![](http://i.imgur.com/i0aopxe.png)

# diable
Daemonize the things out.

## Installation
Run the following commands to download and install the application:

```sh
$ npm install -g diable
```

Run `diable -h` for help.

## Example
```js
// Dependencies
var Diable = require("diable");

// Check if we are already a daemon
if (Diable.isDaemon()) {
    return setTimeout(function () {
        console.log("I was alive for 10 seconds.");
    }, 10000);
}

// Do the stuff
console.log("Daemonizing this process. I will be killed, but I have a child which will live 10 seconds. Do `ps aux | grep node` to see it.");
Diable();
```

## Documentation
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
- **Object** `options`: An object which will be passed to the `exec` function. It is extended with:  - `force` (Boolean): A flag to force daemonizing even the process is a daemon already (default: `false`).
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
