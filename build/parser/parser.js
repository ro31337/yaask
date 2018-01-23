var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var inquirer = require('inquirer');

var Parser =
/*#__PURE__*/
function () {
  function Parser(options) {
    _classCallCheck(this, Parser);

    this.tokens = options.tokens;
  }

  _createClass(Parser, [{
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var result, i, token, answers;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = [];
                i = 0;

              case 2:
                if (!(i < this.tokens.length)) {
                  _context.next = 11;
                  break;
                }

                token = this.tokens[i]; // We need to disable the warning, otherwise all questions will be displayed at the same time

                _context.next = 6;
                return inquirer.prompt(token.q);

              case 6:
                answers = _context.sent;
                // eslint-disable-line no-await-in-loop
                result.push(_Object$assign(answers, {
                  line: token.line
                }));

              case 8:
                i += 1;
                _context.next = 2;
                break;

              case 11:
                return _context.abrupt("return", result);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function parse() {
        return _parse.apply(this, arguments);
      };
    }()
  }]);

  return Parser;
}();

module.exports = {
  Parser
};