const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { Lexer } = require('./lexer/lexer');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-d, --drop', 'output file')
  .action((file) => {
    const lexer = new Lexer();
    const input = new InFile({ file, callback: (line) => lexer.tokenize(line) });
    input.read();
  })
  .parse(process.argv);
