var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

/**
 * Tokenize list format.
 * Line example:
 *
 * "Do you want some coffee?" yes|no
 *
 * Where:
 *
 * message: Do you want some coffee?
 * options: yes|no
 *
 * or
 *
 * "Do you want some coffee?"   yes (Yes, please!) | no_cream (No cream please) | no (No, thanks!)
 *
 * message: Do you want some coffee?
 * options: yes (Yes, please!) | no_cream (No cream please) | no (No, thanks!)
 *
 * Each option then parsed separately (split by |).
 *
 * Token examples:
 * { type: 'list', message: 'Do you want coffee?', choices: [ { name: 'yes' }, { name: 'no' } ] }
 * { type: 'list', message: 'Do you want coffee?',
 *   choices: [ { name: 'Yes, please', value: 'yes' }, { name: 'No, thanks!', value: 'no' } ] }
*/
var FmtList =
/*#__PURE__*/
function () {
  function FmtList() {
    _classCallCheck(this, FmtList);

    // https://regex101.com/r/AjkHUq/1
    this.regex1 = /^"(.+)"(\s+)?(.+?\|.+?)(\s+)?$/; // regex to extract message and options
    // https://regex101.com/r/X2Z9xO/1

    this.regex2 = /^(\s+)?(.+?)(\s+)?\((\s+)?(.+?)(\s+)?\)/; // regex to extract each option
  }

  _createClass(FmtList, [{
    key: "test",
    value: function test(str) {
      var _ref = str.match(this.regex1) || [],
          _ref2 = _slicedToArray(_ref, 4),
          message = _ref2[1],
          options = _ref2[3];

      return message && options;
    }
  }, {
    key: "tokenize",
    value: function tokenize(str) {
      var _ref3 = str.match(this.regex1) || [],
          _ref4 = _slicedToArray(_ref3, 4),
          message = _ref4[1],
          options = _ref4[3];

      var choices = [];
      var oo = options.split(/\|/g) || [];

      for (var i = 0; i < oo.length; i += 1) {
        var raw = oo[i].trim();

        var _ref5 = raw.match(this.regex2) || [],
            _ref6 = _slicedToArray(_ref5, 6),
            value = _ref6[2],
            name = _ref6[5];

        if (value && name) {
          choices.push({
            name,
            value
          });
        } else {
          choices.push({
            name: raw
          });
        }
      }

      return {
        type: 'list',
        name: 'value',
        message,
        choices
      };
    }
  }]);

  return FmtList;
}();

module.exports = {
  FmtList
};