'use strict';

require('instapromise');

let gulp = require('gulp');
let babel = require('gulp-babel');
let changed = require('gulp-changed');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let gutil = require('gulp-util');
let watch = require('gulp-watch');

let WebpackDevServer = require('webpack-dev-server');

let crayon = require('@ccheever/crayon');
let fs = require('fs');
let path = require('path');
let pm2 = require('pm2');
let request = require('request');
let rimraf = require('rimraf');
let webpack = require('webpack');

const paths = {
  source: {
    js: 'src/**/*.js',
  },
  build: 'build',
};

let snapshotBundleAsync = function (bundleUrl, bundleFile) {
  gutil.log("Fetching bundle from", bundleUrl, "...");
  return request.promise.get(bundleUrl).then(function (response) {
    let js = response.body;
    return fs.promise.writeFile(bundleFile, js, 'utf8').then(function () {
      gutil.log("Created bundle at", bundleFile);
    });
  }).catch(function (err) {
    gutil.log(crayon.red("Snapshot Failed:", err));
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
    .pipe(babel())
    .pipe(gulp.dest(paths.build));
});

gulp.task('babel:watch', function() {
  gulp.watch(paths.source.js, ['babel']);
});

gulp.task('webpack', function() {
  // runs webpack build
});

gulp.task('webpack:dev', function() {

});

gulp.task('build', ['babel', 'webpack']);

gulp.task('build:watch', ['babel:watch', 'webpack:watch']);

gulp.task('clean', function(callback) {
  rimraf(paths.build, callback);
});

gulp.task('deploy', function () {
  return pm2.promise.deploy('ecosystem.json5', {
    rawArgs:['deploy', 'ecosystem5.json', 'production']
  });
});
