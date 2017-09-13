module.exports = function(filesId, definition, processFn, onLoadFn) {
  const reader = new FileReader();
  const readLines = require('data-files-common');
  reader.onload = function(progressEvent){
    if(onLoadFn) onLoadFn();
    // By lines
    const lines = this.result.split('\n');
    var index = 0;
    const reader = { on: (type, lineFn) => {
                       lines.forEach(lineFn);
                   }};
    readLines(definition,
              reader,
              processFn);
  };
  reader.readAsText(document.getElementById(filesId).files[0]);
};
