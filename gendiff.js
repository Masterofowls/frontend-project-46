#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const genDiff = require('./genDiff');
const { version } = require('./package.json');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const fullPath1 = path.resolve(process.cwd(), filepath1);
    const fullPath2 = path.resolve(process.cwd(), filepath2);

    const diff = genDiff(fullPath1, fullPath2, options.format);
    console.log(diff);
  })
  .parse(process.argv);


  const fs = require('fs');
  const path = require('path');
  const _ = require('lodash');
  
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

  const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const file1 = parseFile(filepath1);
    const file2 = parseFile(filepath2);
  
    const keys = _.union(_.keys(file1), _.keys(file2));
  
    const result = keys.map((key) => {
      if (!_.has(file1, key)) {
        return `+ ${key}: ${file2[key]}`;
      }
      if (!_.has(file2, key)) {
        return `- ${key}: ${file1[key]}`;
      }
      if (!_.isEqual(file1[key], file2[key])) {
        return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`;
      }
      return `  ${key}: ${file1[key]}`;
    }).join('\n');
  
    // Пока мы игнорируем формат, но позже его реализуем
    if (format === 'plain') {
      // Реализация для plain
    } else if (format === 'json') {
      // Реализация для json
    }
  
    return result;
  };
  
  module.exports = genDiff;
  module.exports = parseFile;