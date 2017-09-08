const gulp = require('gulp');
const spawn = require('child_process').spawn;
const path = require('path');

const gulpmodules = ['./src_modules/common',
                     './src_modules/client',
                     './src_modules/server'];

function moduleStart(taskNames) {
  gulpmodules.forEach((dir) => {
    process.chdir(path.join(__dirname, dir));
    const child = spawn(process.platform === 'win32' ? 'gulp.cmd' : 'gulp', taskNames, { customFds: [0,1,2] });
    child.on('exit', (text) => {
      console.log(text);
    });
  });
};

gulp.task('default', () => {
  moduleStart(['default']);
});
gulp.task('test', () => {
  moduleStart(['test']);
});
gulp.task('clean', () => {
  moduleStart(['clean']);
});
gulp.task('build', () => {
  moduleStart(['build']);
});
