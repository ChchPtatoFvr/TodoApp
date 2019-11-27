const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");


const resolve = relative_path => path.resolve(__dirname, relative_path);


module.exports = {
  entry: resolve('src/main.js'),
  target: 'web',
  resolve: {
    alias: {
      '@src': resolve('src')
    }
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: true
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: resolve('dist/index.html'),
      template: resolve('src/template.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
