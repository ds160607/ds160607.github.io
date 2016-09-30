var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  devtool: 'eval',

  entry: [
    './src/index'
  ],
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin(
      [{ from: 'src/json/*', to: 'json/', flatten: true},
      {from: 'index.html'}],
      { copyUnmodified: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader')
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
