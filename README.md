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
});

app.listen(3000);
```
