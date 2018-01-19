class FmtDefault {
  constructor() {
    // https://regex101.com/r/GdbCGW/2
    this.regex = /^"(.+)"(\s+)?\(default\s+(.+?)(\s+)?\)(\s+)?$/;
  }

  test(str) {
    const [, message, , value] = str.match(this.regex) || [];
    return value && message;
  }

  tokenize(str) {
    const [, message, , value] = str.match(this.regex) || [];
    return {
      type: 'input',
      name: 'value',
      message,
      default: value,
    };
  }
}

module.exports = { FmtDefault };
