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
  it("can split a single line and two columns", () => {
    const process = { fn: function(record) {} };
		spyOn(process, "fn");
		readLines({separator: ",", keys: ["key1","key2"]}, 
      				toFile("value1,value2"),
							process.fn);
    expect(process.fn).toHaveBeenCalledWith({ key1: "value1",
																							key2: "value2" });
	});
  it("can split two lines and one column", () => {
    const process = { fn: function(record) {} };
		spyOn(process, "fn");
		readLines({separator: ",", keys: ["key"]}, 
      				toFile("value1\nvalue2"),
							process.fn);
    expect(process.fn).toHaveBeenCalledWith({key: "value1"});
    expect(process.fn).toHaveBeenCalledWith({key: "value2"});
	});
});
