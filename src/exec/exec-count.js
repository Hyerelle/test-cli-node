/** #2 - add the total count of (people|animals) in the name of each (country|people)  */

const { getNameWithCount } = require("./utils");

module.exports = (countryList = []) => {
  return countryList.map((country = {}) => ({
    ...country,
    // unchanged country + hydrated name (count people)
    name: getNameWithCount(country, "people"),
    people: country.people?.map((people = {}) => ({
      ...people,
      // unchanged people + hydrated name (count animals)
      name: getNameWithCount(people, "animals"),
    })),
  }));
};
