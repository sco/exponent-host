'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = [
  {
    name: 'browser',
    entry: [
      'webpack-dev-server/client?http://localhost:7272',
      'webpack/hot/only-dev-server',
      './src/web/index.js',
    ],
    output: {
      path: path.join(__dirname, 'build/web/'),
      filename: 'bundle.js',
      publicPath: 'http://localhost:7272/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          loaders: ['react-hot', 'babel'],
        },
        {
          test: /\.css$/,
          include: path.join(__dirname, 'src'),
          loaders: ['style', 'css'],
        },
      ],
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      function(compiler) {
        this.plugin('done', function(stats) {
          //require('fs').writeFileSync(path.join(__dirname, 'stats.generated.json'), JSON.stringify(stats.toJson()));
        });
      }
    ]
  },
  // {
  //   // The configuration for the server-side rendering
  //   name: 'server-side rendering',
  //   entry: './server/page.js',
  //   target: 'node',
  //   output: {
  //     path: assetsPath,
  //     filename: '../../server/page.generated.js',
  //     publicPath: publicPath,
  //     libraryTarget: 'commonjs2'
  //   },
  //   externals: /^[a-z\-0-9]+$/,
  //   module: {
  //     loaders: commonLoaders.concat([
  //       { test: /\.css$/,  loader: path.join(__dirname, 'server', 'style-collector') + '!css-loader' },
  //     ])
  //   }
  // }
];
