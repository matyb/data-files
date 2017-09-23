const gulp = require('gulp');
const del = require('del');
const jasmine = require('gulp-jasmine');
gulp.task('clean', () => {
  del("./dist/*");
});
gulp.task('build', ['clean', 'test'], () => {
  return gulp.src(['server.js'])
             .pipe(gulp.dest("./dist"));
});
gulp.task('test', () => {
  return gulp.src(['*.spec.js'])
             .pipe(jasmine())
               .on('error', (e) => { throw e });
});
gulp.task('default', ['build'], () => {});
