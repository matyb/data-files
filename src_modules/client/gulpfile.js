const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserify = require('browserify');
const gutil = require('gulp-util');
const tap = require('gulp-tap');
const del = require('del');
const protractor = require("gulp-protractor").protractor;

gulp.task('clean', () => {
  del(['./dist/*', './test/*']);
});
gulp.task('build', ['test'], () => {
  return gulp.src(['client.js']).pipe(rename('data-files-client.js')).pipe(gulp.dest('./dist'));
});
gulp.task('default', function() {
  return gulp.run(['build']);
});
gulp.task('test', ['clean'], function() {
  gulp.src(['./fake-app/*.html']).pipe(gulp.dest('./test'));
  gulp.src(['./fake-app/fake-app.js'])
      .pipe(tap(function (file) {
        gutil.log('bundling ' + file.path);
        file.contents = browserify(file.path, {debug: true}).bundle();
      }))
      .pipe(gulp.dest('./test'));
  return gulp.src(['client.spec.js'])
             .pipe(protractor({configFile: "client.spec.conf.js"}))
               .on('error', function(e) { throw e });
});
