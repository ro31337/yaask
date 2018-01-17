class FmtSimple {
  constructor() {
    this.regex = /^"(.+)"(\s+)?$/gm;
  }

  test(str) {
    return str.match(this.regex);
  }

  tokenize(str) {
    console.log(str);
  }
};

module.exports = { FmtSimple };
