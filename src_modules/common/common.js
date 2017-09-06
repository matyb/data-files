module.exports = (definition, fileContents, processFn) => {
    return fileContents.on('line', (line) => {
        const vals = line.split(definition.separator);
        const keyVals = vals.map((v, i) => {
            return [definition.keys[i], v];
        });
        const record = keyVals.reduce((obj, kv) => {
            obj[kv[0]] = kv[1];
            return obj;
        }, {});
        processFn(record);
    });
};
