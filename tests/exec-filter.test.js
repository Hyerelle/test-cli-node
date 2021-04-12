const { test } = require("uvu");
const assert = require("uvu/assert");

const execFilter = require("../src/exec/exec-filter");
const mock = require("./mock.json");

test("Basic filter - keep all animals", () => {
  const srcCountries = mock;
  let distCountries = execFilter(srcCountries, "A-");
  assert.equal(srcCountries, distCountries);
});

test("Basic filter - animals from 1st country", () => {
  const srcCountries = [...mock];
  let distCountries = execFilter(srcCountries, "A-0");
  // 1st country unchanged
  assert.equal(srcCountries[0], distCountries[0]);
  // no more 2nd country
  assert.not.equal(srcCountries[1], distCountries[1]);
  assert.type(distCountries[1], "undefined");
});

test("Basic filter - empty result", () => {
  const srcCountries = [...mock];
  let distCountries = execFilter(srcCountries, "unknown-name");
  // check if there is countries
  assert.equal(srcCountries.length, 2);
  assert.equal(distCountries.length, 0);
});

test("Basic filter - empty source", () => {
  const srcCountries = [];
  let distCountries = execFilter(srcCountries, "A-");

  assert.equal(srcCountries.length, 0);
  assert.equal(distCountries.length, 0);
});

test.run();
