# express-chrome-logger

Debug your express app using the Chrome console.

## Install

Install the chrome extension from https://chrome.google.com/webstore/detail/chrome-logger/noaneddfkdjfnfdakjjmocngnfkfehhd

    $ npm i express-chrome-logger

## Example

```js
var express = require("express");
var app = express();

app.use(require("express-chrome-logger"));

app.get("/", function(req, res) {
  res.console.log("Hello", "console!");
  res.console.info("Info!");
  res.console.warn("Warning!");
  res.console.error("Error!");
  res.console.log(req.headers);
  res.console.log(req); // error logging circular object
  res.console.dir(req); // use util.inspect on object
  res.console.group("Grouped");
  res.console.log("1");
  res.console.log("2");
  res.console.groupEnd();
  res.console.groupCollapsed("Grouped collapsed");
  res.console.log("1");
  res.console.log("2");
  res.console.groupEnd();
  res.send("");
  res.console.log("Wont be logged because headers have already been sent.");
});

app.listen(3000);
```

## Methods

* `res.console.log`
* `res.console.info`
* `res.console.dir`
* `res.console.warn`
* `res.console.error`
* `res.console.group`
* `res.console.groupEnd`
* `res.console.groupCollapse`

## Links

* [Chrome Logger](http://craig.is/writing/chrome-logger)
* [node-chromelogger](https://github.com/yannickcr/node-chromelogger) another implemenation of the Chrome logger protocol for node.js.
