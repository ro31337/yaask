const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { Lexer } = require('./lexer/lexer');

// var inquirer = require('inquirer');
// const q = [
//   {
//     type: 'input',
//     name: 'answer',
//     message: 'Your phone number',
//     default: '(555) 111-22-33',
//   },
// ];
// inquirer.prompt(q).then(answers => {
//   console.log(answers);
// });

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-d, --drop', 'output file')
  .action((file) => {
    const lexer = new Lexer();

    new InFile({ file, callback: line => lexer.tokenize(line) })
      .read()
      .on('close', () => {
        console.log(lexer.tokens);
      });
  })
  .parse(process.argv);
