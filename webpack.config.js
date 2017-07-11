const path = require('path');
// const postcssConfig = require('./config/postcss.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      // { test: /\.css$/, include: /src/, use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('[name].bundle.css'),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: postcssConfig,
    //   },
    // }),
  ],
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
  },
  devtool: 'source-map',
};
