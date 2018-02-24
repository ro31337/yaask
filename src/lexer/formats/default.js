class FmtDefault {
  constructor() {
    // https://regex101.com/r/GdbCGW/4
    this.regex = /^"?(.+?)"?(:|(\s))?\(default\s+(.+?)(\s+)?\)(\s+)?$/;
  }

  test(str) {
    if (str.includes('|')) return false; // should support only one option. We use list for multiple
    const [, message, , value] = str.match(this.regex) || [];
    return value && message;
  }

  tokenize(str) {
    const [, message, , , value] = str.match(this.regex) || [];
    return {
      type: 'input',
      name: 'value',
      message,
      default: value,
    };
  }
}

module.exports = { FmtDefault };
