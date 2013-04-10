var util = require("util");

var backtrace = function() {
    var e = new Error();
    var parts = e.stack.split("\n")[3].split(':');
    var file = parts[0].substr(7);
    var line = parts[1];
    return file + " : " + line;
};

var base64 = function(str) {
  return new Buffer(str).toString("base64").replace("\n", "");
};

module.exports = function (req, res, next) {
  var data = {
    version: "0.0.1"
    , columns: ["log", "backtrace", "type"]
    , rows: []
  };

  res.console = {
    log: function () {
      var row = [ Array.prototype.slice.call(arguments), backtrace(), ""];
      data.rows.push(row)
      res.set("X-ChromeLogger-Data", base64(JSON.stringify(data)));
    }
    , info: function () {
      var row = [ Array.prototype.slice.call(arguments), backtrace(), ""];
      data.rows.push(row)
      res.set("X-ChromeLogger-Data", base64(JSON.stringify(data)));
    }
    , dir: function (obj) {
      var row = [ [util.inspect(obj)], backtrace(), ""];
      data.rows.push(row)
      res.set("X-ChromeLogger-Data", base64(JSON.stringify(data)));
    }
    , warn: function (obj) {
      var row = [ Array.prototype.slice.call(arguments), backtrace(), "warn"];
      data.rows.push(row)
      res.set("X-ChromeLogger-Data", base64(JSON.stringify(data)));
    }
    , error: function (obj) {
      var row = [ Array.prototype.slice.call(arguments), backtrace(), "error"];
      data.rows.push(row)
      res.set("X-ChromeLogger-Data", base64(JSON.stringify(data)));
    }
  };

  next();
};
