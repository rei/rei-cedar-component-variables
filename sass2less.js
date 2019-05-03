/* this script fixes some issues that sass2less does not handle */
const fs = require('fs-extra');

const LESS_INDEX = 'dist/less/index.less';

/* rename imports in index.less */
const index = fs.readFileSync(LESS_INDEX, 'utf8')
  .split('\n')
  .map(line => line.replace('scss', 'less'))
  .join('\n');

fs.writeFileSync(LESS_INDEX, index);
