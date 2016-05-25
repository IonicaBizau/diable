
[![diable](http://i.imgur.com/i0aopxe.png)](#)

# `$ diable`

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/diable.svg)](https://travis-ci.org/IonicaBizau/diable/) [![Version](https://img.shields.io/npm/v/diable.svg)](https://www.npmjs.com/package/diable) [![Downloads](https://img.shields.io/npm/dt/diable.svg)](https://www.npmjs.com/package/diable) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Daemonize the things out.

## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g diable
```


Then, run `diable --help` and see what the CLI tool can do.


```
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

## :clipboard: Example


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

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`gh-notifier`](https://bitbucket.org/IonicaBizau/gh-notifier#readme)—Receive desktop notifications from your GitHub dashboard.
 - [`web-term`](https://github.com/IonicaBizau/web-term)—A full screen terminal in your browser.
 - [`wrabbit`](https://github.com/jillix/wrabbit) (by jillix)—Wrap scripts by providing the wrapping function.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
