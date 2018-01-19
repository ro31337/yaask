const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { Lexer } = require('./lexer/lexer');
const { Parser } = require('./parser/parser');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-d, --drop', 'output file')
  .action((file) => {
    const lexer = new Lexer();

    new InFile({ file, callback: line => lexer.tokenize(line) })
      .read()
      .on('close', () => {
        // console.log(require('util').inspect(lexer.tokens, { showHidden: false, depth: null }));
        const parser = new Parser({ tokens: lexer.tokens });
        parser.parse().then((result) => {
          console.log(result);
        });
      });
  })
  .parse(process.argv);
