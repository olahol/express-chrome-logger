# express-chrome-logger

Debug your express app using the Chrome console.

## Install

Install the chrome extension from https://chrome.google.com/webstore/detail/chrome-logger/noaneddfkdjfnfdakjjmocngnfkfehhd

    > npm i express-chrome-logger

## Example

```js
var express = require("express");
var app = express();

app.use(require("express-chrome-logger"));

app.get("/", function(req, res) {
  res.console.log("Hello", "console!");
  res.console.warn("Warning!");
  res.console.error("Error!");
  res.console.dir(req.headers);
  res.send("");
});

app.listen(3000);
```
