/**
 * Tokenize list format.
 * Line example:
 *
 * "Do you want some coffee?" yes|no
 *
 * Where:
 *
 * message: Do you want some coffee?
 * options: yes|no
 *
 * or
 *
 * "Do you want some coffee?"   yes (Yes, please!) | no_cream (No cream please) | no (No, thanks!)
 *
 * message: Do you want some coffee?
 * options: yes (Yes, please!) | no_cream (No cream please) | no (No, thanks!)
 *
 * Each option then parsed separately (split by |).
 *
 * Token examples:
 * { type: 'list', message: 'Do you want coffee?', choices: [ { name: 'yes' }, { name: 'no' } ] }
 * { type: 'list', message: 'Do you want coffee?',
 *   choices: [ { name: 'Yes, please', value: 'yes' }, { name: 'No, thanks!', value: 'no' } ] }
*/
class FmtList {
  constructor() {
    // https://regex101.com/r/AjkHUq/1
    this.regex1 = /^"(.+)"(\s+)?(.+?\|.+?)(\s+)?$/; // regex to extract message and options
    // https://regex101.com/r/X2Z9xO/1
    this.regex2 = /^(\s+)?(.+?)(\s+)?\((\s+)?(.+?)(\s+)?\)/; // regex to extract each option
  }

  test(str) {
    const [, message, , options] = str.match(this.regex1) || [];
    return message && options;
  }

  tokenize(str) {
    const [, message, , options] = str.match(this.regex1) || [];
    const choices = [];
    const oo = options.split(/\|/g) || [];
    for (let i = 0; i < oo.length; i += 1) {
      const raw = oo[i].trim();
      const [, , value, , , name] = raw.match(this.regex2) || [];
      if (value && name) {
        choices.push({ name, value });
      } else {
        choices.push({ name: raw });
      }
    }
    return {
      type: 'list',
      name: 'value',
      message,
      choices,
    };
  }
}

module.exports = { FmtList };
