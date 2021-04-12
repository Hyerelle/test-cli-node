const { data } = require("./data.js");
const { CLI, CLIValue } = require("./app.utils");

// define output value with initial data
let output = data;

try {
  // #1 apply filter if '--filter' in CLI
  if (CLI("filter")) {
    output = require("./exec/exec-filter")(output, CLIValue("filter"));
  }
  // #2 count items if '--count' in CLI
  if (CLI("count")) {
    output = require("./exec/exec-count")(output);
  }
  // display result
  console.log(JSON.stringify(output, null, 2));
} catch (err) {
  console.log("Oups, error while running the program :");
  console.error(err);
}
