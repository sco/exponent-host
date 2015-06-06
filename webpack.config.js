'use strict';

var path = require('path');
var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = [
  {
    devtool: 'eval',
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
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          loaders: ['react-hot', 'babel?stage=0&optional[]=runtime'],
        },
        {
          test: /\.less$/,
          include: path.join(__dirname, 'src'),
          loaders: ['style', 'css', 'less'],
        },
        {
          test: /\.(eot|ttf|woff2?|svg|png)$/,
          loader: 'file',
        }
      ],
    },
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"',
        },
      }),
      new StatsPlugin(path.join(__dirname, 'build/web/server/stats.json'), {
        assets: true,
        chunkModules: false,
        modules: true,
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
