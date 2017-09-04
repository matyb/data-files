const gulp = require('gulp');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const refresh = require('gulp-livereload');
const server = require('tiny-lr')();
const sourcemaps = require('gulp-sourcemaps');
gulp.task('build', () => {
  gulp.src(['./client-common.js', './common.js', './client.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist'))
      .pipe(refresh(server));
});
gulp.task('copy', () => {
  gulp.src('./*.html')
      .pipe(gulp.dest('./dist'));
});
gulp.task('default', function() {
  gulp.run(['build', 'copy']);
});
