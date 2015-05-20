var gulp = require('gulp');
var babel = require('@exponent/gulp-babel');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

var crayon = require('@ccheever/crayon');
var fs = require('fs');
var instapromise = require('instapromise');
var path = require('path');
var pm2 = require('pm2');
var request = require('request');

babel.task(gulp);

var snapshotBundleAsync = function (bundleUrl, bundleFile) {
  gutil.log("Fetching bundle from", bundleUrl, "...");
  return request.promise.get(bundleUrl).then(function (response) {
    var js = response.body;
    return fs.promise.writeFile(bundleFile, js, 'utf8').then(function () {
      gutil.log("Created bundle at", bundleFile);
    });
  }).catch(function (err) {
    gutil.log(crayon.red("Snapshot Failed:", err));
  });
};

gulp.task('snapshot-browser', function (cb) {
  var bundleUrl = 'http://localhost:8081/exponent.includeRequire.runModule.bundle?dev=false&minify=true';
  var bundleFile = path.join(__dirname, 'exponent.bundle.js');
  snapshotBundleAsync(bundleUrl, bundleFile).then(cb);
});

gulp.task('snapshot-home', function (cb) {
  var bundleUrl = 'http://localhost:8081/Home/index.includeRequire.runModule.bundle?dev=false&minify=true';
  var bundleFile = path.join(__dirname, 'home.bundle.js');
  snapshotBundleAsync(bundleUrl, bundleFile).then(cb);
});

gulp.task('snapshot', ['snapshot-browser', 'snapshot-home']);

gulp.task('deploy', function () {
  return pm2.promise.deploy('ecosystem.json5', {rawArgs:['deploy', 'ecosystem5.json', 'production']});
});

gulp.task('default', ['babel-watch']);
