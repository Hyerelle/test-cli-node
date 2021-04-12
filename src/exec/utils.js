// Set of utils method for program execution

// - Concat the obj.name and the obj[arrayKey].length
const getNameWithCount = (obj = {}, arrayKey) =>
  `${obj.name || ""} [${obj[arrayKey]?.length || 0}]`.trim();

module.exports = { getNameWithCount };
