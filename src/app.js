const program = require('commander');
const { InFile } = require('./inputs/in-file');
const { Lexer } = require('./lexer/lexer');

// var inquirer = require('inquirer');

// // // Example 2, list of options, will select name if no value specified
// const choices = [
//   { name: 'yes', value: 'yesss' },
//   { name: 'no'  },
//   { name: 'cancel' },
// ];
// const q = [
//   {
//     type: 'list',
//     name: 'value',
//     message: 'Do you want some coffee?',
//     choices,
//   },
// ];
// inquirer.prompt(q).then(answers => {
//   console.log(answers);
// });

// // Example 1, simple question, default parameter is optional
// const q = [
//   {
//     type: 'input',
//     name: 'value',
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
        console.log(require('util').inspect(lexer.tokens, { showHidden: false, depth: null }));
      });
  })
  .parse(process.argv);
