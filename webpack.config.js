var path = require('path');

module.exports = [
  {
    name: 'browser',
    entry: './src/web/index.js',
    output: {
      path: path.join(__dirname, 'build/web'),
      filename: 'bundle.js',
      publicPath: '',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'babel',
          query: {
            stage: 1,
          },
        },
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
    plugins: [
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
