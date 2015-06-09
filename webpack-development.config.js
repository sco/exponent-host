'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var AssetModulePlugin = require('asset-module-webpack-plugin');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = [
  {
    name: 'browser (development)',
    entry: [
      'webpack-dev-server/client?http://localhost:7272',
      'webpack/hot/only-dev-server',
      './src/web/browser/index.js',
    ],
    output: {
      path: path.join(__dirname, 'build/web/assets'),
      filename: 'bundle.js',
      chunkFilename: '[chunkhash].js',
      publicPath: 'http://localhost:7272/',
      sourceMapFilename: 'debug/[file].map',
      pathinfo: true,
      hashFunction: 'sha512',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          loaders: ['react-hot', 'babel'],
        },
        {
          test: /\.less$/,
          include: path.join(__dirname, 'src'),
          loaders: ['style', 'css', 'less'],
        },
        {
          test: /\.(eot|ttf|woff2?)$/,
          loader: 'file?name=[sha512:hash:base62:20].[ext]',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file?name=[sha512:hash:base62:20].[ext]',
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"',
        },
      }),
      new webpack.PrefetchPlugin('react'),
      new AssetModulePlugin({
        sourceBase: path.join(__dirname, 'src'),
        destinationBase: path.join(__dirname, 'build'),
        test: /\.(css|less|jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        fileSystems: [AssetModulePlugin.DefaultFileSystem, fs],
      }),
      new StatsPlugin(path.join(__dirname, 'build/web/server/stats.json'), {
        assets: true,
        chunkModules: false,
        modules: false,
        reasons: false,
        source: false,
        chunkOrigins: false,
        exclude: [/node_modules\/react\//],
      }),
    ],
    lessLoader: {
      lessPlugins: [
        new LessPluginAutoPrefix({ browsers: ['last 2 versions'] }),
      ],
    }
  },
];
