const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { OutFile } = require('./outputs/out-file');
const { Lexer } = require('./lexer/lexer');
const { Parser } = require('./parser/parser');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-o, --output <output>', 'output file')
  .action((file) => {
    const lexer = new Lexer();

    new InFile({ file, callback: line => lexer.tokenize(line) })
      .read()
      .on('close', () => {
        // console.log(require('util').inspect(lexer.tokens, { showHidden: false, depth: null }));
        const parser = new Parser({ tokens: lexer.tokens });
        parser.parse().then((answers) => {
          // console.log(answers);
          if (program.output) {
            const out = new OutFile({ outFile: program.output, inFile: file, answers });
            out.write().on('close', () => {
              // console.log('Done!');
            });
          }
        });
      });
  })
  .parse(process.argv);
