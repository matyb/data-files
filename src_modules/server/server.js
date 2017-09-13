const readLines = require("data-files-common");
module.exports = (definition, file, processFn) => {
  readLines(definition, require('readline').createInterface({
    input: require('fs').createReadStream(file)
  }), processFn);
};
