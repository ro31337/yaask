const { FmtSimple } = require('./formats/simple');

class Lexer {
  constructor() {
    this.cnt = 0;
    this.tokens = [];
    this.formats = [
      new FmtSimple(),
    ];
  }

  // Process can be optimized if we pre-parse yaml file and feed Lexer with comments only.
  // You'll probably need to feed line number as well.
  tokenize(line) {
    this.cnt += 1;
    if (line.includes('@ask')) {
      const token = this.scan(line);
      if (token) {
        this.tokens.push(token);
      }
    }
  }

  scan(line) {
    // Every line should have the minimum format of:
    // @ask "Lorem ipsum"
    if (!line.match(/@ask\s+?".+?"/g)) {
      throw new Error(`Unexpected format on line ${this.cnt}`);
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
