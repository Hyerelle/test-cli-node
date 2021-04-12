const { test } = require("uvu");
const assert = require("uvu/assert");

const utils = require("../src/app.utils");

test("CLI parser", () => {
  // hydrate process.argv with new values - save it first !
  const _previous = process.argv;
  process.argv = process.argv.concat(["--counter", "--param=value"]);

  // default match
  assert.equal(utils.CLI("counter"), "--counter");
  assert.equal(utils.CLI("param"), "--param=value");
  // ensure no-match
  assert.type(utils.CLI("count"), "undefined");
  assert.type(utils.CLI("p"), "undefined");

  // get arg value
  assert.equal(utils.CLIValue("param"), "value");
  assert.type(utils.CLIValue("counter"), "undefined");
  assert.type(utils.CLIValue("count"), "undefined");

  // restore process.argv
  process.argv = _previous;
});

test.run();
