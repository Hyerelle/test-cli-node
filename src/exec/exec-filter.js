/** #1 - filter data to keep only the countries and people who have an animal whose name matches the criteria */

module.exports = (countries = [], criteria) => {
  // keep only countries with not-empty 'people' array
  const _countries = countries.reduce((stackCountry, country) => {
    // keep only people with not-empty 'animals' array
    const _people = country?.people?.reduce((stackPeople, person) => {
      // find matching animals for the current person, based on criteria
      const _animals = person?.animals?.filter((a) =>
        a?.name?.includes(criteria)
      );
      // if match : persist current person, with filterd animal array
      if (_animals?.length) stackPeople.push({ ...person, animals: _animals });
      return stackPeople;
    }, []);
    // if match : persist current country, with filtered people array
    if (_people?.length) stackCountry.push({ ...country, people: _people });
    return stackCountry;
  }, []);

  return _countries;
};
