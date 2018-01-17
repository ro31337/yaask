const program = require('commander');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-d, --drop', 'output file')
  .action((file) => {
    console.log(file);
  })
  .parse(process.argv);
