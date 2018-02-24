const { FmtSimple } = require('./formats/simple');
const { FmtDefault } = require('./formats/default');
const { FmtList } = require('./formats/list');

class Lexer {
  constructor() {
    this.line = 0;
    this.tokens = [];
    this.formats = [
      new FmtList(),
      new FmtDefault(),
      new FmtSimple(),
    ];
  }

  // Process can be optimized if we pre-parse yaml file and feed Lexer with comments only.
  // You'll probably need to feed line number as well.
  tokenize(line) {
    this.line += 1;
    if (line.includes('@ask')) {
      const q = this.scan(line);
      if (q) {
        this.tokens.push({ line: this.line, q });
      }
    }
  }

  // @private
  scan(line) {
    // Every line should have the minimum format of:
    // @ask "Lorem ipsum"
    // https://regex101.com/r/BALoEo/1
    if (!line.match(/@ask\s.+/g)) {
      throw new Error(`Unexpected format on line ${this.line}`);
    }

    // Try each format and get the token, otherwise throw error
    const str = line.match(/@ask\s+?(.+)/)[1];
    for (let i = 0; i < this.formats.length; i += 1) {
      const format = this.formats[i];
      if (format.test(str)) {
        return format.tokenize(str);
      }
    }

    return null;
  }
}

module.exports = { Lexer };
