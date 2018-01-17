const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { Lexer } = require('./lexer');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-d, --drop', 'output file')
  .action((file) => {
    const lexer = new Lexer();
    const input = new InFile({ file, callback: lexer.process });
    input.read();
  })
  .parse(process.argv);
