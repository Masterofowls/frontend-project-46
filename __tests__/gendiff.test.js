const path = require('path');
const genDiff = require('../genDiff');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare two JSON files in stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = `{
