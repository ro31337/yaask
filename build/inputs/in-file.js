var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var readline = require('readline');

var fs = require('fs');

var InFile =
/*#__PURE__*/
function () {
  function InFile(options) {
    _classCallCheck(this, InFile);

    this.file = options.file;
    this.callback = options.callback;
  }

  _createClass(InFile, [{
    key: "read",
    value: function read() {
      return readline.createInterface({
        input: fs.createReadStream(this.file)
      }).on('line', this.callback);
    }
  }]);

  return InFile;
}();

module.exports = {
  InFile
};