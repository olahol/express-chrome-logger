# express-chrome-logger

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Size][size-image]][size-url]

Debug your express app using the console.

## Install

Install the chrome extension from the [chrome webstore](https://chrome.google.com/webstore/detail/chrome-logger/noaneddfkdjfnfdakjjmocngnfkfehhd),
or use **Firefox Developer Edition** which now natively supports the chrome logger! :clap:

```bash
$ npm i express-chrome-logger --save
```

## Example

```js
var express = require("express");
var app = express();

app.use(require("express-chrome-logger"));

app.get("/", function(req, res) {
  res.console.log("Hello from your server :)");

  res.console.groupAs("Request", function () {
    res.console.dir(req);
  });

  res.console.assert(
    req.headers["user-agent"].search(/Chrome/) !== -1
    , "Not using Chrome"
  );

  res.send("");
});

app.listen(5000);
```

## Documentation

### res.console.log([data], [...])

Log messages to Chrome console.

* * *

### res.console.table([obj, obj, ...])

Log data objects to Chrome console.

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

Log messages in `f` if `test` is false.


## Contributors

* Ola Holmström (@olahol)
* Ryan Wu (@ryanhanwu)
* Alex Art (@elennaro)

[size-image]: https://badge-size.herokuapp.com/olahol/express-chrome-logger/master/index.js.svg
[size-url]: https://github.com/olahol/express-chrome-logger/index.js

[npm-image]: https://img.shields.io/npm/v/express-chrome-logger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/express-chrome-logger

[downloads-image]: http://img.shields.io/npm/dm/express-chrome-logger.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/express-chrome-logger
