var util = require("util")
  , config = require("./package.json");

var encode = function(data) {
  return new Buffer(JSON.stringify(data)).toString("base64");
};

module.exports = function (req, res, next) {
  var data = {
    version: config.version
    , columns: ["log", "backtrace", "type"]
    , rows: []
  };

  var log = function (type, l) {
    l = l ? l : 2;
    return function () {
      try {
        data.rows.push([
          Array.prototype.slice.call(arguments)
          , new Error().stack.split("\n")[l].trim()
          , type
        ]);
        if (!res.headerSent) res.set("X-ChromeLogger-Data", encode(data));
      } catch (e) {
        data.rows.pop();
        log("error", 3)(e.toString());
      }
    };
  };

  res.console = {
    log: log("")
    , info: log("info")
    , debug: log("")
    , warn: log("warn")
    , error: log("error")
    , dir: function (obj) { log("", 3)(util.inspect(obj)); }
    , group: log("group")
    , groupEnd: log("groupEnd")
    , groupAs: function (name, f) { log("groupCollapsed", 3)(name); f(); log("groupEnd", 3)(); }
    , assert: function (test, msg) { if (!test) log("error", 3)("Assertion failed: " + msg); }
  };

  next();
};
