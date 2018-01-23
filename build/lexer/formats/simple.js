var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var FmtSimple =
/*#__PURE__*/
function () {
  function FmtSimple() {
    _classCallCheck(this, FmtSimple);

    this.regex = /^"(.+)"(\s+)?$/;
  }

  _createClass(FmtSimple, [{
    key: "test",
    value: function test(str) {
      return str.match(this.regex);
    }
  }, {
    key: "tokenize",
    value: function tokenize(str) {
      return {
        type: 'input',
        name: 'value',
        message: str.match(this.regex)[1]
      };
    }
  }]);

  return FmtSimple;
}();

module.exports = {
  FmtSimple
};