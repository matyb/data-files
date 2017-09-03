function onFileChange(files){
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // By lines
    const lines = this.result.split('\n');
    var index = 0;
    const reader = { on: (type, lineFn) => {
                       lines.forEach(lineFn);
                   }};
    exports.readLines({ separator: " ", keys: ["type", "data"] },
                      reader,
                      console.log);
  };
  reader.readAsText(files[0]);
};
