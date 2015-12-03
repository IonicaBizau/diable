[![diable](http://i.imgur.com/i0aopxe.png)](#)

# `$ diable` [![Support this project][donate-now]][paypal-donations]

Daemonize the things out.

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g diable
```

Then, run `diable --help` and see what the CLI tool can do.

```sh
$ diable --help
Usage: diable [options]

Options:
  -p, --path <path>  The script path.                              
  -e, --exec <app>   The executable app.                           
  -a, --args <args>  The arguments to pass.                        
  -c, --cwd <path>   The CWD where the daemonized process will run.
  -h, --help         Displays this help.                           
  -v, --version      Displays version information.                 

Examples:
  diable -p path/to/script.js
  diable -p some-script.sh -e sh
  diable -p path/to/script.js -a '--some args'

Documentation can be found at https://github.com/IonicaBizau/diable
```

## Example

Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save diable
```

```js
// Dependencies
var Diable = require("diable");

// Check if we are already a daemon
if (Diable.isDaemon()) {
    setTimeout(function () {
        console.log("I was alive for 10 seconds.");
    }, 10000);
} else {
    console.log("Daemonizing this process. I will be killed, but I have a child which will live 10 seconds. Do `ps aux | grep node` to see it.");
}

// Daemonize this process (only the non-daemons)
Diable();

console.log("I am a daemon.");
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`web-term`](https://github.com/IonicaBizau/web-term)

 - [`wrabbit`](https://github.com/jillix/wrabbit) by jillix

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md