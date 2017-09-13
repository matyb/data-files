# data-files-server
For streaming file processing in the server see [data-files-server](https://github.com/matyb/tree/master/src_modules/server).
> install
```
    npm install --save data-files-server
```
> app.js
```
var fileImport = require("data-files-server");
var records = [];
function processFn(done) {
    records.push(record);
    if (records.length >= 2) {
        done();
    }
}
fileImport({ separator: " ", keys: ["type", "data"] },
            "test-data.txt",
            processFn);
```