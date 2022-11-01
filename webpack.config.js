const { resolve } = require('path');
const { readdirSync } = require('fs');

let entryObject = {};
readdirSync('./pages').forEach(page => {
  if(page.split('.tsx').length > 1) {
    entryObject = {...entryObject, [page.split('.tsx')[0]]: `./pages/${page}`}
  }
});

module.exports = {
  entry: entryObject,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  output: {
    filename: 'src/public/JS/[name].js',
    path: resolve('./test'),
  },
  mode: 'production'
};