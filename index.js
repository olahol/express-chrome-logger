var util = require("util")
  , stringify = require("json-stringify-safe")
  , config = require("./package.json");

var encode = function(data) {
  return new Buffer(stringify(data)).toString("base64");
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
          Array.prototype.slice.call(arguments).map(function (a) {
            if (!a || typeof a !== "object") return a + "";
            a.___class_name = a.constructor.name;
            return a;
          })
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
    , info: log("")
    , debug: log("")
    , table: log("table")
    , warn: log("warn")
    , error: log("error")
    , group: log("group")
    , groupEnd: log("groupEnd")
    , groupCollapsed: log("groupCollapsed")
    , dir: function (obj) { log("", 3)(util.inspect(obj)); }
    , groupAs: function (name, f) { log("groupCollapsed", 3)(name); f(); log("groupEnd", 3)(); }
    , assert: function (test, msg) { if (!test) log("error", 3)("Assertion failed: " + msg); }
    , groupAssert: function (test, msg, f) {
      if (!test) {
        log("groupCollapsed", 3)("Assertion failed: " + msg); f(); log("groupEnd", 3)();
      }
    }
  };

  if (typeof next === "function") next();
};
