class FmtSimple {
  constructor() {
    // https://regex101.com/r/7hjXbd/1
    this.regex = /^"?(.+?\??)"?(\s+)?$/;
  }

  test(str) {
    return str.match(this.regex);
  }

  tokenize(str) {
    return {
      type: 'input',
      name: 'value',
      message: str.match(this.regex)[1],
    };
  }
}

module.exports = { FmtSimple };
