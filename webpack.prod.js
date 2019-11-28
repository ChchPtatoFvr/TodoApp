const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');


const resolve = relative_path => path.resolve(__dirname, relative_path);


module.exports = {
  entry: resolve('src/main.js'),
  target: 'web',
  resolve: {
    alias: {
      '@src': resolve('src')
    }
  },
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
    path: resolve('docs'),
    publicPath: '/TodoApp',
    filename: '[hash].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName}`;
          },
          chunks: 'all',
          maxSize: 244000
        }
      }
    }
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
      filename: resolve('docs/index.html'),
      template: resolve('src/template.html')
    }),
    new CopyPlugin([
      { from: 'public', to: 'public' },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
