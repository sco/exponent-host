'use strict';

var path = require('path');
var process = require('process');
var webpack = require('webpack');

var AutoPrefixLessPlugin = require('less-plugin-autoprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = [
  {
    name: 'client-side rendering (production)',
    target: 'web',
    entry: {
      main: './src/web/browser/index.js',
    },
    output: {
      path: path.join(__dirname, 'build/web/assets'),
      filename: '[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/assets/',
      sourceMapFilename: 'debug/[file].map',
      pathinfo: process.env.NODE_ENV === 'production',
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
          test: /\.(eot|ttf|woff2?|svg|png)$/,
          loader: 'file',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.PrefetchPlugin('react'),
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('commons', '[chunkhash].js'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          screw_ie8: true,
          warnings: false,
        },
      }),
      new StatsPlugin(path.join(__dirname, 'build/web/server/stats.json'), {
        assets: true,
        chunkModules: false,
        modules: true,
        source: false,
        chunkOrigins: false,
        exclude: [/node_modules\/react\//],
      }),
    ],
    lessLoader: {
      lessPlugins: [
        new AutoPrefixLessPlugin({ browsers: ['last 2 versions'] }),
      ],
    }
  },
  {
    name: 'server-side rendering (production)',
    target: 'node',
    entry: [
      './src/web/server/ServerSideRenderer.js',
    ],
    output: {
      path: path.join(__dirname, 'build/web/server'),
      filename: 'ServerSideRenderer.js',
      publicPath: '/assets/',
      sourceMapFilename: 'debug/[file].map',
      libraryTarget: 'commonjs2',
      pathinfo: true,
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
          loader: 'null',
        },
        {
          test: /\.(eot|ttf|woff2?|svg|png)$/,
          loader: 'null',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"productionx"',
        },
      }),
      new webpack.PrefetchPlugin('react'),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
    ],
    lessLoader: {
      lessPlugins: [
        new AutoPrefixLessPlugin({ browsers: ['last 2 versions'] }),
      ],
    }
  },
];
