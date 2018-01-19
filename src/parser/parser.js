const inquirer = require('inquirer');

class Parser {
  constructor(options) {
    this.tokens = options.tokens;
  }

  async parse() {
    const result = [];
    for (let i = 0; i < this.tokens.length; i += 1) {
      const token = this.tokens[i];
      // We need to disable the warning, otherwise all questions will be displayed at the same time
      const answers = await inquirer.prompt(token); // eslint-disable-line no-await-in-loop
      result.push(answers);
    }
    return result;
  }
}

module.exports = { Parser };
