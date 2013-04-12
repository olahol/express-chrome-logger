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
      var back = new Error().stack.split("\n")[l]
                  .match(/at [^ \/]* *\(?([^:]+):(\d+)/).slice(-2).join(" : ");
      data.rows.push([
        Array.prototype.slice.call(arguments)
        , back
        , type
      ]);
      try {
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
    , warn: log("warn")
    , error: log("error")
    , group: log("group")
    , groupEnd: log("groupEnd")
    , groupCollapsed: log("groupCollapsed")
    , dir: function (obj) { log("", 3)(util.inspect(obj)); }
  };

  next();
};
