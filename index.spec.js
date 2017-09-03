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
  it("can split two lines and two columns", () => {
    const process = { fn: function(record) {} };
		spyOn(process, "fn");
		readLines({separator: ",", keys: ["key1","key2"]}, 
      				toFile("value1a,value1b\nvalue2a,value2b"),
							process.fn);
    expect(process.fn).toHaveBeenCalledWith({key1: "value1a",
																						 key2: "value1b"});
    expect(process.fn).toHaveBeenCalledWith({key1: "value2a",
																						 key2: "value2b"});
	});
});
describe('file-import integration testing', () => {
  var records = [];
	var fileImport = require("./index.js").fileImport;
  function processFn(done) {
		return { fn: (record) => {
      records.push(record);
      if(records.length >= 2) {
        done();
      }
		}};
	}
  var process;
  beforeEach((done) => {
    process = processFn(done);
    spyOn(process, 'fn').and.callThrough();
    setTimeout(() => {
		  fileImport({separator: " ", keys: ["type","data"]}, 
                  "test-data.txt",
                  process.fn);
    }, 100);
  });
  it("can read an actual file", () => {
    expect(process.fn).toHaveBeenCalledWith({type: "test", data: "data"});
    expect(process.fn).toHaveBeenCalledWith({type: "test", data: "data2"});
    expect(records).toEqual([{type: "test", data: "data"},
														 {type: "test", data: "data2"}]);
	});
});
