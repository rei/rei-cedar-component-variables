/* this script compiles the classes needed to render each example in /examples */ 
const fs = require('fs-extra');
const compExamples = require('./examples');

const OUTPUT_FILE_PATH = './examples/index.scss';

const styles = Object.keys(compExamples).map((compKey) => {
  const comp = compExamples[compKey];

  return comp.examples.map((compExample) => {
    return `.${comp.name}-${compExample.name} {\n  ${compExample.styles.join('\n  ')}\n}\n`;
  })
});

const styleSheet = styles.reduce((acc, val) => acc.concat(val), ['/* these classes are generated for documentation purposes only, they are not meant for production use. */']).join('\n');

fs.outputFileSync(OUTPUT_FILE_PATH, styleSheet);
