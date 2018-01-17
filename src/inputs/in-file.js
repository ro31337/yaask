const readline = require('readline');
const fs = require('fs');

class InFile {
  constructor(options) {
    this.file = options.file;
    this.callback = options.callback;
  }

  read() {
    readline
      .createInterface({ input: fs.createReadStream(this.file) })
      .on('line', this.callback);
  }
};

module.exports = { InFile };
