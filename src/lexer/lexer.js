const { FmtSimple } = require('./formats/simple');

class Lexer {
  constructor() {
    this.cnt = 0;
    this.formats = [
      new FmtSimple(),
    ];
  }

  // Process can be optimized if we pre-parse yaml file and feed Lexer with comments only.
  // You'll probably need to feed line number as well.
  process(line) {
    this.cnt++;
    const result = [];
    if (line.includes('@ask')) {
      result.push(this.scan(line));
    }
    // TODO: call parser
  }

  scan(line) {
    // Every line should have the minimum format of:
    // @ask "Lorem ipsum"
    if (!line.match(/@ask\s+?".+?"/g)) {
      throw new Error(`Unexpected format on line ${this.cnt}`);
    }

    // Try each format and get the token, otherwise throw error
    const str = line.match(/@ask\s+?(.+)/)[1];
    for (let i = 0; i < this.formats.length; i++) {
      const format = this.formats[i];
      if (format.test(str)) {
        return format.tokenize(str);
      }
    }
  }
};

module.exports = { Lexer };
