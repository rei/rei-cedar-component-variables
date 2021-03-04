const tokens = require('@rei/cdr-tokens/dist/json/web');
const replace = require('replace-in-file');
const files = 'dist/scss/*.vars.scss';

// interpolate color tokens into svg-load statements
replace({
  files,
  from: /\#\{\$cdr-color-.+\}/g,
  to: (match) => {
    const tokenName = match.replace(/\#|{|}|\$/g, '');
    return tokens.colors.find(t => t.name === tokenName).value;
  },
});

// update patch for token imports from cedar
replace({
  files,
  from: 'static/',
  to: (match) => 'node_modules/@rei/cedar/dist/svg/',
});
