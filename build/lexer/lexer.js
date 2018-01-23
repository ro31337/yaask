var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _require = require('./formats/simple'),
    FmtSimple = _require.FmtSimple;

var _require2 = require('./formats/default'),
    FmtDefault = _require2.FmtDefault;

var _require3 = require('./formats/list'),
    FmtList = _require3.FmtList;

var Lexer =
/*#__PURE__*/
function () {
  function Lexer() {
    _classCallCheck(this, Lexer);

    this.line = 0;
    this.tokens = [];
    this.formats = [new FmtList(), new FmtDefault(), new FmtSimple()];
  } // Process can be optimized if we pre-parse yaml file and feed Lexer with comments only.
  // You'll probably need to feed line number as well.


  _createClass(Lexer, [{
    key: "tokenize",
    value: function tokenize(line) {
      this.line += 1;

      if (line.includes('@ask')) {
        var q = this.scan(line);

        if (q) {
          this.tokens.push({
            line: this.line,
            q
          });
        }
      }
    } // @private

  }, {
    key: "scan",
    value: function scan(line) {
      // Every line should have the minimum format of:
      // @ask "Lorem ipsum"
      if (!line.match(/@ask\s+?".+?"/g)) {
        throw new Error(`Unexpected format on line ${this.line}`);
      } // Try each format and get the token, otherwise throw error


      var str = line.match(/@ask\s+?(.+)/)[1];

      for (var i = 0; i < this.formats.length; i += 1) {
        var format = this.formats[i];

        if (format.test(str)) {
          return format.tokenize(str);
        }
      }

      return null;
    }
  }]);

  return Lexer;
}();

module.exports = {
  Lexer
};