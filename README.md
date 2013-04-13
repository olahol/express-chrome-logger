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
  res.console.log("Running express %s", express.version);

  res.console.groupAs("Request", function () {
    res.console.dir(req);
  });

  res.console.assert(
    req.headers["user-agent"].search(/Chrome/) !== -1
    , "Not using Chrome"
  );

  res.send("");
});
```

## Documentation

### res.console.log([data], [...])

Log messages to Chrome console.

* * *

### res.console.info([data], [...])

Same as `res.console.log`.

* * *

### res.console.debug([data], [...])

Same as `res.console.log`.

* * *

### res.console.warn([data], [...])

Log warnings to Chrome console.

* * *

### res.console.error([data], [...])

Log errors to Chrome console, note that this method is not the same as
`res.console.warn` as in standard node.js.

* * *

### res.console.dir(obj)

Use `util.inspect` on `obj`.

* * *

### res.console.assert(test, msg)

Log `msg` as error to Chrome console if `test` is false.

* * *

### res.console.group(name)

Create a Chrome console group.

* * *

### res.console.groupCollapsed(name)

Create a Chrome console group that is collapsed.

* * *

### res.console.groupEnd()

End a Chrome console group.

* * *

### res.console.groupAs(name, f())

Create a collapsed group around messages in `f`.

* * *

### res.console.groupAssert(test, msg, f())

Log messages in `f` if test is false.

## Links

* [Chrome Logger](http://craig.is/writing/chrome-logger)
* [node-chromelogger](https://github.com/yannickcr/node-chromelogger) another implemenation of the Chrome logger protocol for node.js.
