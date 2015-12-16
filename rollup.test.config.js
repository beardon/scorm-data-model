var babel = require('rollup-plugin-babel');
var multiEntry = require('rollup-plugin-multi-entry');

module.exports = {
    entry: multiEntry.entry,
    plugins: [babel(), multiEntry.default('test/**/*.js')],
    format: 'cjs',
    dest: 'build/test.js'
};
