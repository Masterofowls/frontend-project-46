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

    const diff = genDiff(fullPath1, fullPath2);
    console.log(diff);
  })
  .parse(process.argv);
