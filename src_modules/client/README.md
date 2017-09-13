# data-files-client
For asynchronous file processing in the browser see [data-files-client](https://github.com/matyb/tree/master/src_modules/client).
> install
```
    npm install --save data-files-client
```
> html
```
<input type="file" name="file" id="file"/>
```
> app.js
```
const onFileChange = require('data-files-common');
const fileSelectId = 'file';
document.getElementById(fileSelectId).onchange = () => {
  onFileChange(fileSelectId,
               {separator: " ", keys: ["type", "data"]},
               (record) => {alert("type:" + record.type + " data:" + record.data);},
               () => {alert("resetting view")});
};
```
> gulpfile.js
```
gulp.src(['./src/app.js'])
      .pipe(tap(function (file) {
        file.contents = browserify(file.path, {debug: true}).bundle();
      }))
      .pipe(gulp.dest('./dist/app.js'));
```