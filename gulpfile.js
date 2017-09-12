const gulp = require('gulp');
const spawn = require('child_process').spawn;
const path = require('path');

const gulpmodules = ['./src_modules/common',
                     './src_modules/client',
                     './src_modules/server'];

function moduleTask(taskNames) {
  return () => {
    gulpmodules.forEach((dir) => {
      process.chdir(path.join(__dirname, dir));
      const child = spawn(process.platform === 'win32' ? 'gulp.cmd' : 'gulp', taskNames, { customFds: [0,1,2] });
      child.on('exit', (text) => {
        console.log(text);
      });
    });
  };
};

gulp.task('default', moduleTask(['default']));
gulp.task('test', moduleTask(['test']));
gulp.task('clean', moduleTask(['clean']));
gulp.task('build', moduleTask(['build']));
