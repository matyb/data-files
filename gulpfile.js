const gulp = require('gulp');
const { spawn } = require('child_process');
const { join } = require('path');

const gulpmodules = ['./src_modules/common',
                     './src_modules/client',
                     './src_modules/server'];

function moduleTask(taskNames) {
  return () => {
    gulpmodules.forEach((dir) => {
      process.chdir(join(__dirname, dir));
      const gulpCmd = /^win/.test(process.platform) ? 'gulp.cmd' : 'gulp';
      const child = spawn(gulpCmd, taskNames, { customFds: [0,1,2] });
      child.on('exit', console.log);
    });
  };
};

gulp.task('default', moduleTask(['default']));
gulp.task('test', moduleTask(['test']));
gulp.task('clean', moduleTask(['clean']));
gulp.task('build', moduleTask(['build']));
