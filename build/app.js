var program = require('commander');

var _require = require('./inputs/in-file'),
    InFile = _require.InFile;

var _require2 = require('./outputs/out-file'),
    OutFile = _require2.OutFile;

var _require3 = require('./lexer/lexer'),
    Lexer = _require3.Lexer;

var _require4 = require('./parser/parser'),
    Parser = _require4.Parser;

var fs = require('fs');

program.version('0.1.0').arguments('<file>').option('-o, --output <output>', 'output file (required)').action(function (file) {
  if (!program.output) {
    console.log('Error: missing output parameter, provide with -o option.');
    process.exit(1);
  }

  if (fs.existsSync(program.output)) {
    console.log(`Error: file ${program.output} already exists.`);
    process.exit(1);
  }

  var lexer = new Lexer();
  new InFile({
    file,
    callback: function callback(line) {
      return lexer.tokenize(line);
    }
  }).read().on('close', function () {
    // console.log(require('util').inspect(lexer.tokens, { showHidden: false, depth: null }));
    var parser = new Parser({
      tokens: lexer.tokens
    });
    parser.parse().then(function (answers) {
      // console.log(answers);
      if (program.output) {
        var out = new OutFile({
          outFile: program.output,
          inFile: file,
          answers
        });
        out.write().on('close', function () {
          process.exit(0);
        });
      }
    });
  });
}).parse(process.argv);