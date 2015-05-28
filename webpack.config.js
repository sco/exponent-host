'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = [
  {
    name: 'browser',
    entry: [
      'webpack-dev-server/client?http://192.168.1.206:7272',
      'webpack/hot/only-dev-server',
      './src/web/browser/index.js',
    ],
    output: {
      path: path.join(__dirname, 'build/web/assets'),
      filename: 'bundle.js',
      publicPath: 'http://192.168.1.206:7272/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules/core-decorators'),
          ],
          loaders: ['react-hot', 'babel?stage=0&optional[]=runtime'],
        },
        {
          test: /\.less$/,
          include: path.join(__dirname, 'src'),
          loaders: ['style', 'css', 'less'],
        },
        {
          test: /\.(eot|ttf|woff2?|svg)$/,
          loader: 'file',
        }
      ],
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      function(compiler) {
        this.plugin('done', function(stats) {
          //require('fs').writeFileSync(path.join(__dirname, 'stats.generated.json'), JSON.stringify(stats.toJson()));
        });
      }
    ],
  },
];
