const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { OutFile } = require('./outputs/out-file');
const { Lexer } = require('./lexer/lexer');
const { Parser } = require('./parser/parser');
const fs = require('fs');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-o, --output <output>', 'output file (required)')
  .action((file) => {
    if (!program.output) {
      console.log('Error: missing output parameter, provide with -o option.');
      process.exit(1);
    }

    if (fs.existsSync(program.output)) {
      console.log(`Error: file ${program.output} already exists.`);
      process.exit(1);
    }

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
              process.exit(0);
            });
          }
        });
      });
  })
  .parse(process.argv);
