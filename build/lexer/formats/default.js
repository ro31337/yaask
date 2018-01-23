var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var FmtDefault =
/*#__PURE__*/
function () {
  function FmtDefault() {
    _classCallCheck(this, FmtDefault);

    // https://regex101.com/r/GdbCGW/2
    this.regex = /^"(.+)"(\s+)?\(default\s+(.+?)(\s+)?\)(\s+)?$/;
  }

  _createClass(FmtDefault, [{
    key: "test",
    value: function test(str) {
      var _ref = str.match(this.regex) || [],
          _ref2 = _slicedToArray(_ref, 4),
          message = _ref2[1],
          value = _ref2[3];

      return value && message;
    }
  }, {
    key: "tokenize",
    value: function tokenize(str) {
      var _ref3 = str.match(this.regex) || [],
          _ref4 = _slicedToArray(_ref3, 4),
          message = _ref4[1],
          value = _ref4[3];

      return {
        type: 'input',
        name: 'value',
        message,
        default: value
      };
    }
  }]);

  return FmtDefault;
}();

module.exports = {
  FmtDefault
};