const gulp = require('gulp');
const chug = require( 'gulp-chug' );
const gulpfiles = ['./src_modules/common/gulpfile.js', './src_modules/client/gulpfile.js', './src_modules/server/gulpfile.js'];
gulp.task('default', () => {
  gulp.src(gulpfiles)
      .pipe(chug({
        nodeCmd: 'node',
        tasks:  [ 'default' ]
      }));
});
gulp.task('test', () => {
  gulp.src(gulpfiles)
      .pipe(chug({
        nodeCmd: 'node',
        tasks:  [ 'test' ]
      }));
});
gulp.task('clean', () => {
  gulp.src(gulpfiles)
      .pipe(chug({
        nodeCmd: 'node',
        tasks:  [ 'clean' ]
      }));
});
gulp.task('build', () => {
  gulp.src(gulpfiles)
      .pipe(chug({
        nodeCmd: 'node',
        tasks:  [ 'build' ]
      }));
});
