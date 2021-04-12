const { test } = require("uvu");
const assert = require("uvu/assert");

const execCount = require("../src/exec/exec-count");
const mock = require("./mock.json");

test("Basic count", () => {
  const srcCountries = [...mock];
  const distCountries = execCount(srcCountries);

  // - 1st country > 3 people
  assert.is(srcCountries[0].name, "C-0");
  assert.is(distCountries[0].name, "C-0 [3]");
  // - 1st country / 1st people > 2 animals
  assert.is(srcCountries[0].people[0].name, "P-0-0");
  assert.is(distCountries[0].people[0].name, "P-0-0 [2]");
  // - 1st country / 2nd people > 2 animals
  assert.is(srcCountries[0].people[1].name, "P-0-1");
  assert.is(distCountries[0].people[1].name, "P-0-1 [2]");
  // - 1st country / 3rd people > 1 animal
  assert.is(srcCountries[0].people[2].name, "P-0-2");
  assert.is(distCountries[0].people[2].name, "P-0-2 [1]");

  // - 2nd country > 2 people
  assert.is(srcCountries[1].name, "C-1");
  assert.is(distCountries[1].name, "C-1 [2]");
  // - 2nd country / 1st people > 1 animal
  assert.is(srcCountries[1].people[0].name, "P-1-0");
  assert.is(distCountries[1].people[0].name, "P-1-0 [1]");
  // - 2nd country / 2nd people > 3 animals
  assert.is(srcCountries[1].people[1].name, "P-1-1");
  assert.is(distCountries[1].people[1].name, "P-1-1 [3]");
});

test("Count without animals", () => {
  const srcCountries = JSON.parse(JSON.stringify(mock));

  // remove animals array of people in 1st country
  srcCountries[0].people.forEach((p) => delete p.animals);

  const distCountries = execCount(srcCountries);

  // - 1st country > still 3 people
  assert.is(srcCountries[0].name, "C-0");
  assert.is(distCountries[0].name, "C-0 [3]");

  // - 1st country > people has no animals
  for (let i = 0; i < srcCountries[0].people.length; i++) {
    assert.is(srcCountries[0].people[i].name, `P-0-${i}`);
    assert.is(distCountries[0].people[i].name, `P-0-${i} [0]`);
  }
});

test("Count without people", () => {
  const srcCountries = JSON.parse(JSON.stringify(mock));

  // remove people from 1st country
  delete srcCountries[0].people;

  const distCountries = execCount(srcCountries);

  // // - 1st country > no more people
  assert.is(srcCountries[0].name, "C-0");
  assert.is(distCountries[0].name, "C-0 [0]");
  assert.is(typeof srcCountries[0].people, "undefined");
  assert.is(typeof distCountries[0].people, "undefined");

  // // - 2nd country > still 2 people
  assert.is(srcCountries[1].name, "C-1");
  assert.is(distCountries[1].name, "C-1 [2]");
});

test("Count invalid structure", () => {
  const srcCountries = [
    {
      name: "C-0",
      people: [
        {
          // people with no name !
          noname: "P-0-0",
          animals: [{ name: "A-0-0-0" }, { name: "A-0-0-1" }],
        },
      ],
    },
  ];
  const distCountries = execCount(srcCountries);

  // people count for countries is unchanged
  assert.is(srcCountries[0].name, "C-0");
  assert.is(distCountries[0].name, "C-0 [1]");

  // people.name is added after count
  assert.is(srcCountries[0].people[0].name, undefined);
  assert.is(distCountries[0].people[0].name, "[2]");

  // additionnal attribute are kept
  assert.is(typeof srcCountries[0].people[0].noname, "string");
  assert.is(typeof distCountries[0].people[0].noname, "string");
});

test.run();
