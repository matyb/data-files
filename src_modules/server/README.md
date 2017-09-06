# file-import-server
For streaming file processing in the server see [file-import-server](https://github.com/matyb/tree/master/src_modules/server).
> install
```
    npm install --save file-import-server
```
> app.js
```
var fileImport = require("file-import-server");
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