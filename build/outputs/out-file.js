var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var readline = require('readline');

var fs = require('fs');

var OutFile =
/*#__PURE__*/
function () {
  function OutFile(options) {
    _classCallCheck(this, OutFile);

    this.inFile = options.inFile;
    this.outFile = options.outFile;
    this.answers = options.answers;
    this.line = 0; // https://regex101.com/r/STBe3l/1/

    this.regex = /(^.+?):.+?(#(\s+)?@ask(.+?)?$)/;
  }

  _createClass(OutFile, [{
    key: "write",
    value: function write() {
      var _this = this;

      return readline.createInterface({
        input: fs.createReadStream(this.inFile)
      }).on('line', function (str) {
        _this.process(str);
      });
    }
  }, {
    key: "process",
    value: function process(str) {
      this.line += 1;
      var result = str;

      for (var i = 0; i < this.answers.length; i += 1) {
        var answer = this.answers[i];

        if (answer.line === this.line && answer.value) {
          var _str$match = str.match(this.regex),
              _str$match2 = _slicedToArray(_str$match, 3),
              start = _str$match2[1],
              end = _str$match2[2];

          if (start && end) {
            result = `${start}: ${answer.value} ${end}`;
          }
        }
      }

      fs.appendFileSync(this.outFile, `${result}\n`, 'utf8');
    }
  }]);

  return OutFile;
}();

module.exports = {
  OutFile
};