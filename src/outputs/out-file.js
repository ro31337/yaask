const readline = require('readline');
const fs = require('fs');

class OutFile {
  constructor(options) {
    this.inFile = options.inFile;
    this.outFile = options.outFile;
    this.answers = options.answers;
    this.line = 0;
    // https://regex101.com/r/STBe3l/1/
    this.regex = /(^.+?):.+?(#(\s+)?@ask(.+?)?$)/;
  }

  write() {
    return readline
      .createInterface({ input: fs.createReadStream(this.inFile) })
      .on('line', (str) => { this.process(str); });
  }

  process(str) {
    this.line += 1;
    let result = str;
    for (let i = 0; i < this.answers.length; i += 1) {
      const answer = this.answers[i];
      if (answer.line === this.line && answer.value) {
        const [, start, end] = str.match(this.regex);
        if (start && end) {
          result = `${start}: ${answer.value} ${end}`;
        }
      }
    }
    console.log(result);
  }
}

module.exports = { OutFile };
