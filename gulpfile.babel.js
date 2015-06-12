'use strict';

import 'instapromise';

import gulp from 'gulp';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';

import WebpackDevServer from 'webpack-dev-server';

import co from 'co';
import crayon from '@ccheever/crayon';
import fs from 'fs';
import path from 'path';
import pm2 from 'pm2';
import request from 'request';
import rimraf from 'rimraf';
import webpack from 'webpack';

const paths = {
  source: {
    js: 'src/**/*.js',
  },
  build: 'build',
};

let snapshotBundleAsync = function (bundleUrl, bundleFile) {
  gutil.log('Fetching bundle from', bundleUrl, '...');
  return request.promise.get(bundleUrl).then(function (response) {
    let js = response.body;
    return fs.promise.writeFile(bundleFile, js, 'utf8').then(function () {
      gutil.log('Created bundle at', bundleFile);
    });
  }).catch(function (err) {
    gutil.log(crayon.red('Snapshot Failed:', err));
  });
};

gulp.task('snapshot-browser', function (cb) {
  let bundleUrl = 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true';
  let bundleFile = path.join(__dirname, 'exponent.bundle.js');
  snapshotBundleAsync(bundleUrl, bundleFile).then(cb);
});

gulp.task('snapshot-home', function (cb) {
  var bundleUrl = 'http://localhost:8081/Home/index.includeRequire.runModule.bundle?dev=false&minify=true';
  var bundleFile = path.join(__dirname, 'home.bundle.js');
  snapshotBundleAsync(bundleUrl, bundleFile).then(cb);
});

gulp.task('snapshot', ['snapshot-browser', 'snapshot-home']);

gulp.task('babel', function() {
  return gulp.src(paths.source.js)
    .pipe(plumber())
    .pipe(changed(paths.build))
    .pipe(babel({
      stage: 1,
      whitelist: [
        'asyncToGenerator',
        'flow',
        'react',
        'runtime',
        'strict',
        'es6.arrowFunctions',
        'es6.classes',
        'es6.destructuring',
        'es6.modules',
        'es6.objectSuper',
        'es6.parameters.default',
        'es6.parameters.rest',
        'es6.properties.computed',
        'es6.regex.sticky',
        'es6.regex.unicode',
        'es6.spread',
        'es6.tailCall',
        'es7.asyncFunctions',
        'es7.classProperties',
        'es7.comprehensions',
        'es7.decorators',
        'es7.doExpressions',
        'es7.exponentiationOperator',
        'es7.exportExtensions',
        'es7.functionBind',
        'es7.objectRestSpread',
        'es7.trailingFunctionCommas',
      ],
      optional: [
        'asyncToGenerator',
        'runtime',
      ],
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('babel:watch', function() {
  gulp.watch(paths.source.js, ['babel']);
});

gulp.task('webpack', co.wrap(function*() {
  let config = require('./webpack-production.config.js');
  let compiler = webpack(config);
  let stats = yield compiler.promise.run();

  if (!stats.hasWarnings() && !stats.hasErrors()) {
    return;
  }

  let jsonStats = stats.toJson();
  if (stats.hasErrors()){
    for (let errorMessage of jsonStats.errors) {
      gutil.log(crayon.red(errorMessage));
    }
  }
  if (stats.hasWarnings()) {
    for (let warningMessage of jsonStats.warnings) {
      gutil.log(crayon.orange(warningMessage));
    }
  }
}));

gulp.task('webpack:watch', function() {
  let config = require('./webpack-production.config.js');
  let compiler = webpack(config);
  let lastHash = null;
  compiler.watch({}, function(error, stats) {
    if (error) {
      gutil.log(crayon.red(error.stack));
    } else if (stats.hash !== lastHash) {
      lastHash = stats.hash;
      gutil.log('Rebuilt static resources');
      gutil.log(stats.toString({
        colors: true,
        chunks: false,
        chunkModules: true,
        modules: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        errorDetails: false,
        chunkOrigins: false,
        exclude: ['node_modules'],
      }));
    }
  });
});

gulp.task('webpack:dev', function() {
  let config = require('./webpack-development.config.js');
  let compiler = webpack(config);
  let server = new WebpackDevServer(compiler, {
    colors: true,
    hot: true,
  });
  server.listen(7272, 'localhost', function() {});
});

gulp.task('build', ['babel', 'webpack']);

gulp.task('build:watch', ['babel', 'babel:watch', 'webpack:watch']);

gulp.task('build:dev', ['babel', 'babel:watch', 'webpack:dev']);

gulp.task('clean', function(callback) {
  rimraf(paths.build, callback);
});

gulp.task('deploy', function () {
  return pm2.promise.deploy('ecosystem.json', {
    rawArgs:['deploy', 'ecosystem.json', 'production']
  });
});

gulp.task('default', ['build:watch']);
