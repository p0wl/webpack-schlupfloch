var path = require('path');
var SchlupflochPlugin = require('./SchlupflochPlugin');
var webpack = require('webpack');

module.exports = {
  entry: { 
    'test-stubs': './test/app/entry-stubs.js',
    'test-resolve': './test/app/entry-resolve.js' 
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
  },
  plugins: [
    // new webpack.NamedModulesPlugin(), // works with or without
    new SchlupflochPlugin()
  ],
  resolve: {
    modules: [
      path.resolve('./test/app/resolve/'),
    ],
    alias: {
      'some-wired-alias': path.resolve(__dirname, 'test/app/resolve/gimme-alias.js')
    }
  },
  devtool: "source-map"
}