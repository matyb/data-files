describe('file-import integration testing', () => {
  var records = [];
  var fileImport = require("./server.js");
  function processFn(done) {
    return {
      fn: (record) => {
        records.push(record);
        if (records.length >= 2) {
          done();
        }
      }
    };
  }
  var process;
  beforeEach((done) => {
    process = processFn(done);
    spyOn(process, 'fn').and.callThrough();
    setTimeout(() => {
      fileImport({ separator: " ", keys: ["type", "data"] },
                "test-data.txt",
                process.fn);
    }, 100);
  });
  it("can read an actual file", () => {
    expect(process.fn).toHaveBeenCalledWith({ type: "test", data: "data" });
    expect(process.fn).toHaveBeenCalledWith({ type: "test", data: "data2" });
    expect(records).toEqual([{ type: "test", data: "data" },
                             { type: "test", data: "data2" }]);
  });
});
