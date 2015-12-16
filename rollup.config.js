var babel = require('rollup-plugin-babel');

module.exports = {
    entry: 'src/index.js',
    plugins: [babel()],
    format: 'cjs',
    dest: 'dist/index.js',
    moduleName: 'scormDataModel'
};
