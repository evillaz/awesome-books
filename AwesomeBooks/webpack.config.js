const path = require('path');

module.exports = {
  entry: './modules/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};