describe("using readLines", () => {
    function toFile(string) {
        const lines = string.split("\n");
        return {
            on: (type, lineFn) => {
                lines.forEach(lineFn);
            }
        };
    }
    var readLines = require("./common.js");
    it("can split a single line and column", () => {
        const process = { fn: function (record) { } };
        spyOn(process, "fn");
        readLines({ separator: ",", keys: ["key"] },
                    toFile("value"),
                    process.fn);
        expect(process.fn).toHaveBeenCalledWith({ key: "value" });
    });
    it("can split a single line and two columns", () => {
        const process = { fn: function (record) { } };
        spyOn(process, "fn");
        readLines({ separator: ",", keys: ["key1", "key2"] },
                  toFile("value1,value2"),
                  process.fn);
        expect(process.fn).toHaveBeenCalledWith({
            key1: "value1",
            key2: "value2"
        });
    });
    it("can split two lines and one column", () => {
        const process = { fn: function (record) { } };
        spyOn(process, "fn");
        readLines({ separator: ",", keys: ["key"] },
                    toFile("value1\nvalue2"),
                    process.fn);
        expect(process.fn).toHaveBeenCalledWith({ key: "value1" });
        expect(process.fn).toHaveBeenCalledWith({ key: "value2" });
    });
    it("can split two lines and two columns", () => {
        const process = { fn: function (record) { } };
        spyOn(process, "fn");
        readLines({ separator: ",", keys: ["key1", "key2"] },
                    toFile("value1a,value1b\nvalue2a,value2b"),
                    process.fn);
        expect(process.fn).toHaveBeenCalledWith({
            key1: "value1a",
            key2: "value1b"
        });
        expect(process.fn).toHaveBeenCalledWith({
            key1: "value2a",
            key2: "value2b"
        });
    });
});
