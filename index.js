var util = require("util")
  , config = require("./package.json");

var backtrace = function(e) {
  return e.stack.split("\n")[3].match(/at ([^:]+):(\d+)/)
          .slice(-2).join(":");
};

var encode = function(data) {
  return new Buffer(JSON.stringify(data)).toString("base64");
};

module.exports = function (req, res, next) {
  var data = {
    version: config.version
    , columns: ["log", "backtrace", "type"]
    , rows: []
  };

  var log = function (type) {
    return function () {
      try {
       data.rows.push([
          Array.prototype.slice.call(arguments)
          , backtrace(new Error())
          , type
        ]);
        if (!res.headersSent) res.set("X-ChromeLogger-Data", encode(data));
      } catch (e) {
        data.rows.pop();
        log("error")(e.toString());
      }
    };
  };

  res.console = {
    log: log("")
    , info: log("info")
    , warn: log("warn")
    , error: log("error")
    , group: log("group")
    , groupEnd: log("groupEnd")
    , groupCollapsed: log("groupCollapsed")
    , dir: function (obj) { log("")(util.inspect(obj)); }
  };

  next();
};
