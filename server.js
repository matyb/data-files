const readLines = require("./common.js").readLines;
exports.fileImport = (definition, file, processFn) => {
  readLines(definition, require('readline').createInterface({
    input: require('fs').createReadStream(file)
  }), processFn);
};
