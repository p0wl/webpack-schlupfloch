var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: { 
    'test-stubs': './test/app/entry-stubs.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // required
  ],
  devtool: "source-map"
}