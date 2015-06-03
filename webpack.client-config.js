'use strict';

var path = require('path');
var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');

module.exports = [
  {
    name: 'browser',
    entry: [
      // 'webpack-dev-server/client?http://localhost:7272',
      // 'webpack/hot/only-dev-server',
      './src/web/browser/index.js',
    ],
    output: {
      path: path.join(__dirname, 'build/web/assets'),
      filename: 'bundle.js',
      //publicPath: 'http://localhost:7272/',
      publicPath: '/assets/',
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
          test: /\.(eot|ttf|woff2?|svg)$/,
          loader: 'file',
        }
      ],
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          screw_ie8: true,
        },
      }),
      function(compiler) {
        this.plugin('done', function(stats) {
          //require('fs').writeFileSync(path.join(__dirname, 'stats.generated.json'), JSON.stringify(stats.toJson()));
        });
      }
    ],
    lessLoader: {
      lessPlugins: [
        new LessPluginAutoPrefix({ browsers: ['last 2 versions'] }),
      ],
    }
  },
];
