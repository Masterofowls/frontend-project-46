const _ = require('lodash');
const parseFile = require('./parser');

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));

  const result = keys.map((key) => {
    if (!_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    return `    ${key}: ${file1[key]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};

module.exports = genDiff;
