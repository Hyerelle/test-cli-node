const { test } = require("uvu");
const assert = require("uvu/assert");

const { getNameWithCount } = require("../src/exec/utils");

test("getNameWithCount", () => {
  // default usage
  assert.equal(
    "name [3]",
    getNameWithCount({ name: "name", arr: [1, 2, 3] }, "arr")
  );
  // array with no size
  assert.equal("name [0]", getNameWithCount({ name: "name", arr: [] }, "arr"));
  // unexisting array
  assert.equal("name [0]", getNameWithCount({ name: "name" }, "arr"));
  // invalid object
  assert.equal("[0]", getNameWithCount({}));
  // invalid object with array
  assert.equal("[2]", getNameWithCount({ arr: [1, 2] }, "arr"));
});

test.run();
