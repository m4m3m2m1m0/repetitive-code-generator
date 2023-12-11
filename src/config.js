const { readFileSync } = require("fs");

exports.default = {
  async getConfig(path) {
    let file = "";

    try {
      file = readFileSync(path, "utf8");
    } catch (e) {
      console.log(
        "No config file found. That's fine, you can create one if you need to (rcg.json)."
      );
      return null;
    }

    try {
      return JSON.parse(file);
    } catch (e) {
      throw "Config file must be a valid JSON file";
    }
  },
};
