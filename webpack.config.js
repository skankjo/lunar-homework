const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
          ],
        }),
      },
      {
        test: /\.(gif|jpg|png)$/,
        loader: 'url-loader',
        options: { limit: 10000 },
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader',
      },
      {
        test: /favicon\.ico$/,
        loader: 'url-loader',
        options: { limit: 1 },
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: { limit: 100000 },
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('[name].bundle.css'),
  ],
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
  },
  devtool: 'source-map',
};
