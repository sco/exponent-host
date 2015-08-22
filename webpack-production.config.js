'use strict';

var path = require('path');
var process = require('process');
var webpack = require('webpack');

var AssetModulePlugin = require('asset-module-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');

const CDN_URL = 'http://static.exp.host/v0/';

module.exports = [
  {
    progress: true,
    name: 'client-side rendering (production)',
    target: 'web',
    entry: {
      main: './src/web/browser/index.js',
      vendor: ['react', 'react-router', 'react-bootstrap'],
    },
    output: {
      path: path.join(__dirname, 'build/web/assets'),
      filename: '[hash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: CDN_URL,
      sourceMapFilename: 'debug/[file].map',
      pathinfo: process.env.NODE_ENV === 'production',
      hashFunction: 'sha512',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          loader: 'babel?stage=0&optional[]=runtime',
        },
        {
          test: /\.less$/,
          include: path.join(__dirname, 'src'),
          loader: ExtractTextPlugin.extract('style', 'css!less'),
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.PrefetchPlugin('react'),
      new ExtractTextPlugin('[sha512:contenthash:base62:20].css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[chunkhash:20].js',
        minChunks: Infinity,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          screw_ie8: true,
          warnings: false,
        },
      }),
      new AssetModulePlugin({
        sourceBase: path.join(__dirname, 'src'),
        destinationBase: path.join(__dirname, 'build'),
        test: /\.(css|less|jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
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
