describe("using file-import", () => {
  function toFile(string) {
    const lines = string.split("\n");
    return {
      on: (type, lineFn) => {
        lines.forEach((line) => {
					lineFn(line);
				});
      }
    };
  }
	var readLines = require("./index.js").readLines;
  it("can split a single line and column", () => {
    const process = { fn: function(record) {} };
		spyOn(process, "fn");
		readLines({separator: ",", keys: ["key"]}, 
      				toFile("value"),
							process.fn);
    expect(process.fn).toHaveBeenCalledWith({ key: "value" });
	});
});
