const fs = require('fs');
const path = require('path');

const parseFile = (filepath) => {
  const ext = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  switch (ext) {
    case '.json':
      return JSON.parse(content);
    // Можно добавить поддержку других форматов здесь
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

module.exports = parseFile;
