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
import spawnAsync from '@exponent/spawn-async';
import webpack from 'webpack';

const paths = {
  source: {
    js: 'src/**/*.js',
  },
  build: 'build',
};

let snapshotBundleAsync = function(bundleUrl, bundleFile) {
  gutil.log('Fetching bundle from', bundleUrl, '...');
  return request.promise.get(bundleUrl).then(function(response) {
    let js = response.body;
    return fs.promise.writeFile(bundleFile, js, 'utf8').then(function() {
      gutil.log('Created bundle at', bundleFile);
    });
  }).catch(function(err) {
    gutil.log(crayon.red('Snapshot Failed:', err));
  });
};

gulp.task('snapshot-browser', function(cb) {
  let bundleUrl = 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true';
  let bundleFile = path.join(__dirname, 'exponent.bundle.js');
  snapshotBundleAsync(bundleUrl, bundleFile).then(cb);
});

gulp.task('snapshot-home', function(cb) {
  var bundleUrl = 'http://localhost:8081/home.includeRequire.runModule.bundle?dev=false&minify=true';
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
        'es6.parameters',
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
  if (stats.hasErrors()) {
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

gulp.task('koa', ['build:dev'], function(callback) {
  return spawnAsync('node', ['./build'], {stdio: 'inherit', cwd: __dirname}).then((result) => {
    return callback(null, result);
  }, (err) => {
    return callback(err);
  });
});

var _serverTask;
gulp.task('koa:start-or-restart', function(callback) {
  if (_serverTask) {
    var child = _serverTask.child;
    if (!child) {
      gutil.log(crayon.red('No child process'));
    } else {
      if (child.killed) {
        // already killed
      } else {
        var killed = _serverTask.child.kill();
        if (killed) {
          gutil.log('Killed server process');
        }
      }
      if (!child.killed && !killed) {
        gutil.log(crayon.red("Couldn't kill server child process!"));
        if (callback) {
          callback(new Error("Couldn't kill server child process!"));
        }
        return -1;
      }
    }
  }
  // TODO: Instead of doing an inherit here, it would be more accurate
  // to stream it and not call the callback until we get the 'Listening...' message to stdout
  // but we won't worry about that for now
  _serverTask = spawnAsync('node', ['./build'], {stdio: 'inherit', cwd: __dirname});
  callback(null, _serverTask);
});

gulp.task('koa:watch', ['koa:start-or-restart'], function() {
  gulp.watch(paths.build + '/**/*', ['koa:start-or-restart']);
});

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

gulp.task('webpack:dev', function(callback) {
  let config = require('./webpack-development.config.js');
  let compiler = webpack(config);
  let server = new WebpackDevServer(compiler, {
    colors: true,
    hot: true,
  });
  server.listen(7272, 'localhost', callback);
});

gulp.task('build', ['babel', 'webpack']);

gulp.task('build:watch', ['babel', 'babel:watch', 'webpack:watch']);

gulp.task('build:dev', ['babel', 'babel:watch', 'webpack:dev']);

gulp.task('clean', function(callback) {
  rimraf(paths.build, callback);
});

gulp.task('deploy', function() {
  return pm2.promise.deploy('ecosystem.json', {
    rawArgs: ['deploy', 'ecosystem.json', 'production'],
  });
});

gulp.task('default', ['build:watch']);

gulp.task('dev', ['build:dev', 'koa:watch']);

gulp.task('api', ['koa:watch', 'babel:watch']);
