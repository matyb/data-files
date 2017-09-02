function readLines(definition, fileContents, processFn) {
  return fileContents.on('line', (line) => {   
		const vals = line.split(definition.separator);
    const keyVals = vals.map((v, i) => {
  		return [definition.keys[i], v];
	  });
 		console.log(keyVals);
  	const record = keyVals.reduce((obj, kv) => {
	  	obj[kv[0]] = kv[1];
			return obj;
    }, {});
		console.log(record);
		processFn(record);
  });
};
exports.readLines = readLines;
exports.fileImport = (definition, file, processFn) => {
  readLines(definition, require('readline').createInterface({
    input: require('fs').createReadStream('file.in')
  }), processFn);		
};
